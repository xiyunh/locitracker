// First drafts, written in-house. Review before publishing — especially any
// claim about specs or timelines.
export const posts = [
  {
    slug: 'why-a-sticker',
    tag: 'Behind Loci',
    date: 'October 2026',
    title: 'Why we are building a tracker you can stick to anything',
    excerpt:
      'Trackers are shaped like keychains, so everything without a keyring gets left behind. We started Loci with a different question: what if the tracker disappeared into the thing itself?',
    body: [
      'Every tracker on the market is shaped like a keychain. That works for keys — and for almost nothing else. Passports, remotes, cameras, notebooks, bike seats: the things people actually lose rarely have a keyring.',
      'Loci started with a different question: what if the tracker disappeared into the thing itself? A sticker is the most honest answer. Peel, press, done. No pouches, no loops, no carved-out slots.',
      'Getting there means obsessing over thickness, antenna design, and adhesives that survive pockets and airports without leaving residue. That is the work we are deep in right now, and this blog is where we will share it — the wins and the failed prototypes alike.',
    ],
    imageNote: 'PHOTO — early Loci prototypes on a workbench',
  },
  {
    slug: 'how-the-network-finds',
    tag: 'Engineering',
    date: 'October 2026',
    title: 'Beyond Bluetooth range: how a finding network works',
    excerpt:
      'A tracker alone can only shout a few meters. The interesting part is what happens when yours is on the other side of the city.',
    body: [
      'Bluetooth is honest about its limits: a tracker alone can only shout a few meters. The interesting engineering question is what happens when your item is on the other side of the city.',
      'The answer is a finding network. Phones that pass near a lost tracker can relay its position — encrypted, anonymously, without either owner knowing anything about the other. The more people carry the app, the denser the net becomes.',
      'Privacy is the hard constraint we design against: location reports are end-to-end encrypted so that only the owner can read them, and relaying devices never learn what they relayed. We will publish more detail on this design as we lock it down.',
    ],
    imageNote: 'DIAGRAM — how an encrypted sighting travels from a passerby to you',
  },
  {
    slug: 'designing-the-app',
    tag: 'Design',
    date: 'September 2026',
    title: 'Designing the Loci app like an instrument, not a dashboard',
    excerpt:
      'Finding something is a tense moment. The app should feel like a well-made compass: calm, legible, and exact.',
    body: [
      'Most tracking apps look like dashboards — graphs, menus, noise. But the moment you open a finder app, you are usually mildly stressed. The design should lower your pulse, not raise it.',
      'We modeled the Loci app on instruments instead: a dial for sightings, a compass for direction, monospaced type for exact readings. Dark, quiet surfaces keep attention on the one number that matters — how far away your item is.',
      'The same language carries into this site, and eventually into the packaging. A tool you trust should look like a tool.',
    ],
    imageNote: 'SCREENSHOT — the sightings dial in the Loci app',
  },
]
