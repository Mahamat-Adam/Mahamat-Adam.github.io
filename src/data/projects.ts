export type Project = {
  id: string
  title: string
  category: string
  blurb: string
  detail: string[]
  tech: string[]
  link?: string
  linkLabel?: string
  image?: string
  /** extra views shown in the detail dialog with prev/next arrows */
  images?: string[]
  accent: string
}

export const projects: Project[] = [
  {
    id: 'roar-commerce',
    title: 'ROAR Commerce',
    category: '3D corporate site transformation',
    blurb:
      'Industrial-brutalist 3D transformation of an e-commerce operations site serving Malaysia and Singapore: WebGL conveyors, dispatch yards and a living sea chart.',
    detail: [
      `A full-site transformation for an e-commerce operations company serving Malaysia
       and Singapore, in a "space-grade industrial" design language: the homepage runs a
       WebGL conveyor of labelled parcels under a gantry, a 3D dispatch yard animates
       cargo deliveries to marketplace docks, and a living nautical chart flies freight
       across South-East Asia. All of it procedural, no downloaded models.`,
      `Beyond the homepage, more than a dozen content pages were rebuilt into a shared
       design system with reusable components, delivered as a scoped WordPress plugin
       that leaves the rest of the site untouched.`,
    ],
    tech: ['Three.js', 'WebGL', 'JavaScript', 'CSS', 'WordPress'],
    link: 'https://roarcommerce.co',
    linkLabel: 'Visit the site',
    image: '/img/projects/roar-commerce.jpg',
    accent: '#FF6B35',
  },
  {
    id: 'awesomeree-ai',
    title: 'Awesomeree AI',
    category: 'Live · 3D landing experience',
    blurb:
      'Neo-brutalist landing page I built for Awesomeree, fronted by an interactive WebGL mascot. Live in production.',
    detail: [
      `The public landing page for Awesomeree, the company I interned at. It is a
       single-page experience built around a pixel-robot mascot rendered in WebGL: it
       tracks your cursor, waves, blinks and reacts, while procedural 3D models of the
       company's products parade across the hero.`,
      `I took the approved design prototype through more than a dozen refinement
       rounds (responsive re-composition for mobile, animation tuning, performance
       warm-up for the 3D scene), then packaged the whole page as a cleanly scoped
       WordPress plugin and helped carry it to the live production homepage, including
       SEO setup and a working demo-request pipeline.`,
    ],
    tech: ['Three.js', 'WebGL', 'JavaScript', 'CSS', 'WordPress'],
    link: 'https://awesomeree.com.my',
    linkLabel: 'Visit the live site',
    image: '/img/projects/awesomeree-ai.jpg',
    accent: '#FFE600',
  },
  {
    id: 'scooter-experience',
    title: 'Electric Scooter Experience',
    category: 'Scroll-driven 3D brand site',
    blurb:
      'A fully procedural 3D scooter rides a procedural street as you scroll, with 9 routes, a 13-model garage and live 3D in every card.',
    detail: [
      `The homepage is a scroll-driven film: a scooter modelled entirely from code rides
       through a procedurally built neighbourhood, pausing at pinned story beats (the
       airless wheel, the motor, a three-second fold animation, a tappable headlamp),
       with drag-to-rotate handed over whenever the user wants control.`,
      `A garage view rebuilds and repaints the same 3D model for 13 product variants,
       and every showroom card carries its own live 3D viewer through a custom
       multi-view renderer, flipping to real product photography on demand. Nine routes
       in total, verified on desktop and mobile.`,
    ],
    tech: ['React', 'TypeScript', 'Three.js (R3F)', 'Tailwind CSS', 'Framer Motion'],
    image: '/img/projects/scooter.jpg',
    images: [
      '/img/projects/scooter.jpg',
      '/img/projects/scooter-2.jpg',
      '/img/projects/scooter-4.jpg',
    ],
    accent: '#00D4FF',
  },
  {
    id: 'games-room',
    title: 'Games-Room Collection',
    category: 'Scroll-scrubbed 3D product film',
    blurb:
      'One persistent 3D table plays four identities (billiards, air hockey, ping-pong, dining), all scrubbed by scroll.',
    detail: [
      `The centrepiece is a procedural games table that transforms as you scroll:
       billiard balls break and drop into genuinely cut pockets, the bed flips into an
       air-hockey rink, a ping-pong board flies on, and a dining top completes the
       four-in-one story. Every phase is deterministic and scrubbable in both directions.`,
      `Around the film: an interactive "will it fit your room" planner with sliders and
       honest PERFECT / SNUG / WON'T FIT verdicts, per-product 3D pages for the foosball
       and air-hockey lines, a persistent basket, and a curated buyer-photo marquee.`,
    ],
    tech: ['React', 'TypeScript', 'Three.js (R3F)', 'Tailwind CSS', 'Framer Motion'],
    image: '/img/projects/games-room.jpg',
    images: [
      '/img/projects/games-room.jpg',
      '/img/projects/games-room-2.jpg',
      '/img/projects/games-room-3.jpg',
      '/img/projects/games-room-4.jpg',
    ],
    accent: '#00FF88',
  },
  {
    id: 'sensor-bins',
    title: 'Premium Bin Showcase',
    category: 'Interactive 3D one-pager',
    blurb:
      'Tap the pedal and the 3D bin opens with a soft-close lid, plus an exploded-view scroll film and live finish swatches.',
    detail: [
      `A premium one-pager for a line of sensor and pedal waste bins. The hero is an
       interactive procedural 3D model: tap the pedal and the lid opens then soft-closes,
       the product's actual selling point, demonstrated rather than described. Finish
       swatches repaint the model live.`,
      `A 340vh sticky scroll film pulls the product apart into an exploded craft view,
       an SVG fit guide recommends the right model for your space, and a review section
       pairs verified buyer photos with verbatim comments in a split-card marquee.`,
    ],
    tech: ['React', 'TypeScript', 'Three.js (R3F)', 'Tailwind CSS', 'Framer Motion'],
    image: '/img/projects/bins.jpg',
    images: [
      '/img/projects/bins.jpg',
      '/img/projects/bins-2.jpg',
      '/img/projects/bins-3.jpg',
      '/img/projects/bins-4.jpg',
    ],
    accent: '#CFB489',
  },
  {
    id: 'racing-chair',
    title: 'Racing Chair One-Pager',
    category: 'Cinematic scroll film',
    blurb:
      'Scrolling reclines the 3D chair from 90° to 155°, then the whole scene and the UI shift into night mode.',
    detail: [
      `A single-page cinematic film where the page scroll drives the product itself:
       the procedural chair reclines from upright to full recline as you read, ending in
       a day-to-night scene morph that latches the entire interface into night mode.`,
      `The model sells the details: a genuinely see-through alpha-weave mesh back,
       quilted stitching, a drag-to-adjust gas lift in an interactive blueprint section
       with live measurement labels, and a variant stage for colourway swaps.`,
    ],
    tech: ['React', 'TypeScript', 'Three.js (R3F)', 'Tailwind CSS', 'Framer Motion'],
    image: '/img/projects/chair.jpg',
    images: ['/img/projects/chair.jpg', '/img/projects/chair-2.jpg', '/img/projects/chair-4.jpg'],
    accent: '#9B5DE5',
  },
  {
    id: 'helmet-site',
    title: 'Helmet Brand One-Pager',
    category: 'Photography-led product site',
    blurb:
      'An 18-colourway picker tints the whole stage per shade, with day/night visor states and an honest fit finder.',
    detail: [
      `A photography-led product page for a dual-visor commuter helmet, built on the
       judgement call that great cutout photography beats a compromised 3D model for
       smooth organic shapes. An 18-colourway picker re-tints the stage per shade.`,
      `Interactive sections include a dark day/night visor-state demo, an annotated
       details diagram with hover-synced callouts, and a fit finder that measures in cm
       and returns an honest size verdict. Five complete alternative art directions were
       also produced as standalone mockups for design selection.`,
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/img/projects/helmet.jpg',
    images: [
      '/img/projects/helmet.jpg',
      '/img/projects/helmet-2.jpg',
      '/img/projects/helmet-4.jpg',
    ],
    accent: '#E63946',
  },
]
