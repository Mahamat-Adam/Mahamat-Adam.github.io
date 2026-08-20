export type Project = {
  id: string
  title: string
  category: string
  blurb: string
  detail: string[]
  tech: string[]
  link?: string
  linkLabel?: string
  /** Public source, shown beside the live link. Only my own projects have one. */
  repo?: string
  image?: string
  /** extra views shown in the detail dialog with prev/next arrows */
  images?: string[]
  accent: string
}

export const projects: Project[] = [
  {
    id: 'roar-commerce',
    title: 'ROAR Commerce',
    category: 'Corporate site rebuilt end to end',
    blurb:
      'Industrial-brutalist 3D transformation of an e-commerce operations site serving Malaysia and Singapore: WebGL conveyors, dispatch yards and a living sea chart.',
    detail: [
      `A full-site transformation for an e-commerce operations company serving Malaysia
       and Singapore, in a "space-grade industrial" design language: the homepage runs a
       WebGL conveyor of labelled parcels under a gantry, a 3D dispatch yard animates
       cargo deliveries to marketplace docks, and a living nautical chart flies freight
       across South-East Asia. All of it procedural, no downloaded models.`,
      `Beyond the homepage, more than a dozen content pages were rebuilt into a shared
       design system with reusable components, delivered on WordPress. The work is
       published and official, and you can reach it through the link below.`,
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
    category: 'Live · interactive mascot landing',
    blurb:
      'Neo-brutalist landing page I built for Awesomeree, fronted by an interactive WebGL mascot. Live in production.',
    detail: [
      `The public landing page for Awesomeree, the company I interned at. It is a
       single-page experience built around a pixel-robot mascot rendered in WebGL: it
       tracks your cursor, waves, blinks and reacts, while procedural 3D models of the
       company's products parade across the hero.`,
      `I took the approved design prototype through more than a dozen refinement
       rounds: responsive re-composition for mobile, animation tuning, and performance
       warm-up for the 3D scene. I then uploaded and published it on WordPress,
       replacing the previous homepage design with my new one once management signed
       off, and set up SEO along with a working demo-request pipeline.`,
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
    category: 'Procedural 3D brand experience',
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
    category: 'One table, four identities',
    blurb:
      'One persistent 3D table plays four identities (billiards, air hockey, ping-pong, dining), all scrubbed by scroll.',
    detail: [
      `The centrepiece is a procedural games table that transforms as you scroll:
       billiard balls break and drop into genuinely cut pockets, the bed flips into an
       air-hockey rink, a ping-pong board flies on, and a dining top completes the
       four-in-one story. Every phase is deterministic and scrubbable in both directions.`,
      `Around the film: an interactive "will it fit your room" planner with sliders and
       honest PERFECT / SNUG / WON'T FIT verdicts, per-product 3D pages for the foosball
       and air-hockey lines, a persistent basket, and a curated marquee of buyer photos and reviews.`,
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
    category: 'A demo you can press',
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
    category: 'Day-to-night cinematic film',
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
    category: 'Photography-led product page',
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
  {
    /*
     * Mine, not Awesomeree's — the only entry here that is, which is why the
     * notice above the grid says so and why this is the one card carrying a
     * source link.
     */
    id: 'job-radar',
    title: 'Job Radar',
    category: 'Live · my own project',
    blurb:
      'A job search tool that reads your CV in your own browser and ranks real openings against it. No account, no upload, no backend — and it refreshes itself every morning.',
    detail: [
      `I built this while job hunting myself, because the tools that promise to fix
       cross-border job hunting either want a subscription or quietly upload your CV to
       somebody's server. This one has no backend at all: the CV is parsed as JavaScript
       on the page you already have open, so there is nowhere for the file to go.`,
      `Ranking weighs the skills you have against what each role asks for, how closely
       your past titles match, and how recently the role appeared — with rare skills
       counting for more than the ones everybody lists. It reads what level you are at
       and pushes roles far above it down, which is the part most job boards get wrong.
       Listings from a company's own careers page are re-checked daily, so a role that
       comes off their site disappears here too.`,
      `The whole thing runs itself: a scheduled workflow collects from company career
       pages and public feeds every morning, deduplicates across sources, caps how many
       openings any single employer can contribute, and redeploys. Country filtering
       runs on an interactive WebGL globe, and the pipeline that feeds it is Node with
       no database — the published index is the only state.`,
    ],
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Node.js', 'GitHub Actions'],
    link: 'https://mahamat-adam.github.io/job-radar/',
    linkLabel: 'Visit the site',
    repo: 'https://github.com/Mahamat-Adam/job-radar',
    image: '/img/projects/job-radar.jpg',
    images: ['/img/projects/job-radar.jpg', '/img/projects/job-radar-2.jpg'],
    accent: '#3B82F6',
  },
]
