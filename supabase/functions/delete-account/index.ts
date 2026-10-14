// Deletes the calling user's own account (auth user + cascading rows in
// profiles/tags/sightings via their FKs).
// Deploy:  supabase functions deploy delete-account   (or paste in the
//          dashboard editor; leave "Verify JWT" ON — the app sends the
//          signed-in user's token, which is how we know who to delete)
// Secrets: SB_SECRET_KEY (your sb_secret_... key)
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const secretKey = Deno.env.get("SB_SECRET_KEY");
  if (!supabaseUrl || !secretKey) return json({ error: "Server not configured" }, 500);

  const jwt = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!jwt) return json({ error: "Not signed in" }, 401);

  const admin = createClient(supabaseUrl, secretKey);
  const { data, error } = await admin.auth.getUser(jwt);
  if (error || !data.user) return json({ error: "Not signed in" }, 401);

  const { error: delErr } = await admin.auth.admin.deleteUser(data.user.id);
  if (delErr) return json({ error: delErr.message }, 500);

  return json({ ok: true });
});
