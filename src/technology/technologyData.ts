export interface TechnologyHeroData {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  arrowAriaLabel: string;
}

export interface ScienceSectionData {
  scienceHeading: string;
  scienceBody: string;
  approachHeading: string;
  approachBody: string;
}

export interface AirInActionCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  objectPosition: string;
  isProvisionalCopy?: boolean;
}

export interface ArticleCard {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  linkText: string;
  image: string;
  alt: string;
}

export const TECHNOLOGY_PAGE_DATA = {
  hero: {
    eyebrow: 'THE TECHNOLOGY BEHIND KIYOKI',
    headlineLine1: 'The Science',
    headlineLine2: 'of Clean Air',
    arrowAriaLabel: 'Scroll down to explore Kiyoki technology',
  } as TechnologyHeroData,

  strip: {
    prefix: 'ENGINEERED FOR ',
    highlight: 'EVERY ROOM.',
  },

  science: {
    scienceHeading: 'OUR SCIENCE',
    scienceBody:
      'At Kiyoki, we think about air as a system, not simply a product feature. Incoming air, the path it travels, the material it passes through and the way it returns to your surroundings all shape the experience. Our approach brings particle filtration, carefully considered airflow and practical product design together, so cleaner air can feel like a natural part of everyday life—at home, on the move and closer to every breath.',
    approachHeading: 'OUR APPROACH',
    approachBody:
      'Every format starts with a different need. Our air purifier considers how air moves through a room. Our portable air purifier brings that thinking into a compact, easy-to-place form. Our mask explores filtration close to the person wearing it, with comfort and breathability in mind. Across all three products, we consider air intake, filtration pathways, purposeful delivery and how people interact with the technology in the real world.',
  } as ScienceSectionData,

  airInAction: {
    heading: 'Air in Action',
    cards: [
      {
        id: 'home',
        badge: '01 / AT HOME',
        title: 'Air Purifier',
        // PROVISIONAL COPY — Pending final user confirmation (Option A literal downsample)
        description:
          'Thoughtfully directed airflow and filter media, designed to help cleaner live air throughout your living space.',
        image: '/src/technology/assets/images/card-at-home-sunset.jpg',
        alt: 'Kiyoki Air Purifier coastal sunset environment',
        objectPosition: 'center 40%',
        isProvisionalCopy: true,
      },
      {
        id: 'portable',
        badge: '02 / ON THE GO',
        title: 'Portable Air Purifier',
        description:
          'Clean-air thinking in a compact form, designed for more flexible placement and everyday mobility.',
        image: '/src/technology/assets/images/purification-moment-portable.jpg',
        alt: 'Kiyoki Portable Air Purifier on stone surface',
        objectPosition: 'center 60%',
      },
      {
        id: 'mask',
        badge: '03 / UP CLOSE',
        title: 'Protective Mask',
        description:
          'A close-range approach to portable filtration, where fit, breathability and ease of use matter.',
        image: '/src/technology/assets/images/purification-moment-mask.jpg',
        alt: 'Person wearing ergonomic Kiyoki protective mask',
        objectPosition: 'center 35%',
      },
    ] as AirInActionCard[],
  },

  breatheEasy: {
    heading: 'Breathe easy.',
    eyebrow: "LET'S CONNECT",
    description: 'Curious about our technology? Explore the science with Kiyoki.',
  },

  pureAirInMotion: {
    headingLine1: 'PURE AIR',
    headingLine2: 'IN MOTION',
    paragraph1:
      'From quiet spaces to busy commutes, we believe cleaner air should move with your life.',
    paragraph2:
      'Purposeful filtration, considered airflow and human-centered design—working together in the everyday.',
    image: '/src/technology/assets/images/studio-mixing.jpg',
    imageAlt: 'Audio mixing studio console with sound engineer',
  },

  articles: {
    heading: 'Read More About Our Technology',
    // PROVISIONAL COPY — Pending final user confirmation
    subtitle:
      'Explore filtration, air quality awareness, and the thinking behind our products in everyday environments.',
    isSubtitleProvisional: true,
    cards: [
      {
        id: 'urban-pollution',
        title: 'Indoor Air Pollution in Urban India',
        excerpt: 'The sources/causes, the invisible problem and why awareness matters.',
        readTime: '3 min read',
        linkText: 'Read Article →',
        image: '/src/technology/assets/images/urban-pollution.png',
        alt: 'Urban city traffic light trails at night in India',
      },
      {
        id: 'modern-filtration',
        title: 'Inside Modern Air Filtration',
        excerpt: 'Active air purification and how molecules work together.',
        readTime: '3 min read',
        linkText: 'Read Article →',
        image: '/src/technology/assets/images/negative-ions.png',
        alt: 'Luminous blue active air filtration particles and negative ions',
      },
    ] as ArticleCard[],
  },
};
