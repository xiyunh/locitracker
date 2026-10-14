// Records a shopper sign-up and sends the welcome email (via Resend).
// Deploy:  supabase functions deploy signup --no-verify-jwt   (or paste in the dashboard editor, Verify JWT off)
// Secrets: SB_SECRET_KEY (your sb_secret_... key — required on new-API-key projects),
//          RESEND_API_KEY, WELCOME_FROM="Loci <hello@yourdomain.com>", SITE_URL=https://yoursite.com
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function welcomeHtml(name: string, siteUrl: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#071018;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 28px;color:#f5f0e8;">
    <p style="font-size:11px;letter-spacing:4px;color:#d2b478;text-transform:uppercase;margin:0;">Loci</p>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:34px;line-height:1.15;margin:18px 0 0;color:#f5f0e8;">
      Welcome, ${name}.
    </h1>
    <p style="font-size:15px;line-height:1.7;color:#c8ccd4;margin:18px 0 0;">
      Your Loci profile is ready. You now get early word on drops, order tracking,
      and faster checkout for the world&rsquo;s first sticker tracker &mdash; under
      1&nbsp;mm thick, with 18 months of battery life.
    </p>
    <a href="${siteUrl}/shop" style="display:inline-block;margin:28px 0 0;background:#f5f0e8;color:#11385b;text-decoration:none;font-size:13px;letter-spacing:1px;padding:14px 26px;border-radius:6px;font-weight:600;">
      SHOP LOCI
    </a>
    <p style="font-size:12px;line-height:1.6;color:#6b7683;margin:36px 0 0;border-top:1px solid #152a3d;padding-top:18px;">
      You are receiving this one-time email because this address was used to create
      a Loci shopper profile. &copy; 2026 Loci &mdash; the world&rsquo;s first sticker tracker.
    </p>
  </div>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  let name = "", email = "";
  try {
    const body = await req.json();
    name = String(body.name ?? "").trim().slice(0, 120);
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    return json({ error: "invalid body" }, 400);
  }
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "name and valid email required" }, 400);
  }

  const secretKey =
    Deno.env.get("SB_SECRET_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!secretKey) return json({ error: "server key not configured" }, 500);
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, secretKey);

  const { data: existing, error: selectError } = await supabase
    .from("shoppers").select("email").eq("email", email).maybeSingle();
  if (selectError) {
    return json({ error: "lookup failed", detail: selectError.message, v: 2 }, 500);
  }

  const created = !existing;
  if (created) {
    const { error: insertError } = await supabase
      .from("shoppers").insert({ name, email });
    if (insertError) {
      return json({ error: "insert failed", detail: insertError.message, v: 2 }, 500);
    }
  }

  // Send the welcome email only on first sign-up, and only if Resend is configured.
  let emailSent = false;
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (created && resendKey) {
    const siteUrl = Deno.env.get("SITE_URL") ?? "https://loci-tracker.com";
    const from = Deno.env.get("WELCOME_FROM") ?? "Loci <onboarding@resend.dev>";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Welcome to Loci — find anything",
        html: welcomeHtml(name, siteUrl),
      }),
    });
    emailSent = response.ok;
    if (emailSent) {
      await supabase.from("shoppers")
        .update({ welcome_email_sent_at: new Date().toISOString() })
        .eq("email", email);
    }
  }

  return json({ ok: true, created, emailSent, v: 2 });
});
