/**
 * Content for the legal pages. Each section renders with a gold numeral and a
 * serif heading; body items are paragraphs (strings) or bullet lists ({ list }).
 */
export const legalPages = {
  terms: {
    label: 'Legal',
    title: 'Terms &',
    emphasis: 'Conditions',
    updated: 'September 10, 2026',
    intro:
      'These terms govern your use of the Loci website and your purchase of Loci products. By browsing the site, joining a pre-order list, or placing an order, you agree to them.',
    sections: [
      {
        title: 'Using this site',
        body: [
          'You may browse, shop, and share this site for personal, non-commercial use. You agree not to misuse the site — including attempting to disrupt it, scrape it at scale, misrepresent your identity, or interfere with anyone else’s use of it.',
          'We may update, suspend, or discontinue any part of the site at any time. We may also update these terms; the date above reflects the latest revision, and continued use of the site after a change means you accept the revised terms.',
        ],
      },
      {
        title: 'Products & pricing',
        body: [
          'Loci Sticker trackers and accessories are described as accurately as we can, including the confirmed specifications of under 2 mm thickness and up to 18 months of battery life under typical use. Battery life varies with settings, usage, and environment.',
          'Prices are listed in U.S. dollars and exclude taxes and any applicable duties, which are calculated at checkout. We may change prices at any time; changes never affect orders already placed.',
          'Occasionally a product may be mispriced or out of stock despite appearing available. If that affects your order, we will contact you with the option to confirm at the corrected price or cancel for a full refund.',
        ],
      },
      {
        title: 'Pre-orders',
        body: [
          'Joining a pre-order list reserves your place for an upcoming drop. No payment is collected when you join.',
          {
            list: [
              'We will email you before the drop ships with a checkout link and final pricing.',
              'You can leave a pre-order list at any time before checkout, with no obligation.',
              'Pre-order positions are personal to you and cannot be sold or transferred.',
            ],
          },
        ],
      },
      {
        title: 'Intellectual property',
        body: [
          'The Loci name, compass mark, product designs, site design, text, and imagery are owned by Loci or its licensors. You may not reproduce or use them commercially without our written permission.',
        ],
      },
      {
        title: 'Warranty & liability',
        body: [
          'Loci products come with a one-year limited warranty against defects in materials and workmanship. The warranty does not cover normal wear, adhesive depletion from repeated re-sticking beyond the supplied refills, loss of the tracked item, or damage from misuse.',
          'Loci is a locating aid, not a security or safety device. To the fullest extent permitted by law, we are not liable for indirect or consequential losses — including the loss of, or failure to recover, any item a Loci is attached to. Nothing in these terms limits liability that cannot be limited by law, and nothing affects your statutory rights.',
        ],
      },
      {
        title: 'Governing law & contact',
        body: [
          'These terms are governed by the laws of the State of Oregon, USA, without regard to conflict-of-law rules. Disputes will be handled in the state or federal courts located in Multnomah County, Oregon.',
          'Questions about these terms: support@loci-tracker.com.',
        ],
      },
    ],
  },

  privacy: {
    label: 'Legal',
    title: 'Privacy',
    emphasis: 'Policy',
    updated: 'September 10, 2026',
    intro:
      'Loci exists to help you find your things — not to track you. This policy explains what little we collect on this site, why, and the choices you have.',
    sections: [
      {
        title: 'What we collect',
        body: [
          {
            list: [
              'Order details — your name, email, and shipping address when you place an order.',
              'Pre-order interest — your name, email, and chosen product when you join a pre-order list.',
              'Newsletter signup — your email address, only if you subscribe.',
              'Support messages — whatever you choose to include when you contact us.',
            ],
          },
          'That is the whole list. We do not collect browsing analytics, advertising identifiers, or device fingerprints on this site.',
        ],
      },
      {
        title: 'What we never collect',
        body: [
          'The location of your Loci trackers and the items they are attached to is never visible to this website or to our marketing systems. Item locations live in the Loci app on your device. We cannot see where your things are, and we do not want to.',
          'We never sell or rent personal information to anyone.',
        ],
      },
      {
        title: 'Where your data lives',
        body: [
          {
            list: [
              'Your bag, account profile, addresses, and order history are stored locally in your own browser. Clearing your browser data removes them.',
              'Pre-order submissions are saved in your browser and, where configured, backed up to our order database so we can contact you when a drop ships.',
              'Payments are processed by our payment providers (such as the card networks, Apple Pay, Google Pay, PayPal, and Affirm). We never see or store full card numbers.',
            ],
          },
        ],
      },
      {
        title: 'How we use it',
        body: [
          'We use your information to fulfil orders, notify you about pre-orders you joined, respond to support requests, and — only if you subscribed — send occasional product news. Every marketing email includes a one-click unsubscribe.',
        ],
      },
      {
        title: 'Cookies',
        body: [
          'This site does not use advertising or analytics cookies. The only browser storage we use is the local storage described above, which stays on your device.',
        ],
      },
      {
        title: 'Your rights',
        body: [
          'You can ask us at any time to access, correct, or delete the personal information we hold about you, or to stop emailing you. Depending on where you live, you may have additional rights under laws such as the GDPR or the California Consumer Privacy Act — we honor requests from everyone, regardless of location.',
          'To exercise any of these rights, email support@loci-tracker.com. We respond within 30 days.',
        ],
      },
      {
        title: 'Changes to this policy',
        body: [
          'If we change how we handle personal information, we will update this page and the date above. Meaningful changes will be announced on the site before they take effect.',
        ],
      },
    ],
  },

  accessibility: {
    label: 'Legal',
    title: 'Accessibility',
    emphasis: 'Statement',
    updated: 'September 10, 2026',
    intro:
      'Finding things should be for everyone. We design and build this site to be usable with assistive technology and are committed to meeting WCAG 2.2 Level AA.',
    sections: [
      {
        title: 'What we build in',
        body: [
          {
            list: [
              'Full keyboard navigation, with visible gold focus outlines on every interactive element.',
              'Semantic HTML landmarks, headings, and labels for screen readers.',
              'Text and interface colors chosen to meet contrast requirements against our dark palette.',
              'Reduced-motion support: when your system asks for less motion, animations and floating effects are turned off.',
              'Layouts that reflow for zoom up to 400% and for small screens.',
            ],
          },
        ],
      },
      {
        title: 'The 3D product viewer',
        body: [
          'The interactive 3D model in our homepage hero is decorative and never the only way to get information. Product details, specifications, and dimensions are always presented as text. If 3D rendering is unavailable in your browser, a static product image is shown instead.',
        ],
      },
      {
        title: 'Known limitations',
        body: [
          {
            list: [
              'Dragging the 3D model is a pointer gesture; an equivalent keyboard rotation control is on our roadmap.',
              'Some decorative background artwork (such as the world map) is hidden from screen readers by design.',
            ],
          },
        ],
      },
      {
        title: 'Testing',
        body: [
          'We test with keyboard-only navigation, browser zoom, macOS VoiceOver, and automated audits as part of building each release.',
        ],
      },
      {
        title: 'Feedback',
        body: [
          'If anything on this site is hard to use with your setup, we genuinely want to know. Email support@loci-tracker.com with “Accessibility” in the subject line and a description of the issue and your assistive technology. We aim to respond within two business days and to fix verified barriers promptly.',
        ],
      },
    ],
  },

  returns: {
    label: 'Legal',
    title: 'Returns &',
    emphasis: 'Refunds',
    updated: 'September 10, 2026',
    intro:
      'If Loci isn’t right for you, returns are simple. Here is exactly how they work.',
    sections: [
      {
        title: 'The 30-day window',
        body: [
          'You can return any product within 30 days of delivery for a full refund of the product price. Items should be in their original condition and packaging where possible; a peeled-and-tried sticker with its unused refills is fine.',
        ],
      },
      {
        title: 'Pre-orders',
        body: [
          'Joining a pre-order list costs nothing, so there is nothing to refund — you can leave a list at any time before checkout. Once a pre-order converts to a paid order, the standard 30-day window applies from delivery.',
        ],
      },
      {
        title: 'How to start a return',
        body: [
          {
            list: [
              'Email support@loci-tracker.com with your order number (it looks like LOCI-XXXXXX).',
              'We reply within two business days with a prepaid return label for U.S. orders. International customers ship at cost, refunded if the item is faulty.',
              'Drop the package off. Once it reaches us, your refund is issued to the original payment method.',
            ],
          },
        ],
      },
      {
        title: 'Refund timing',
        body: [
          'Refunds are issued within 3 business days of the return arriving, and typically appear on your statement within 5–10 business days depending on your bank or payment provider. We will email you at each step.',
        ],
      },
      {
        title: 'Exchanges & warranty',
        body: [
          'Want a different finish or pack size? The fastest route is a return plus a new order — pre-order and stock permitting, we will prioritize the replacement. Faults appearing after 30 days are covered by the one-year limited warranty described in our Terms & Conditions.',
        ],
      },
    ],
  },
}
