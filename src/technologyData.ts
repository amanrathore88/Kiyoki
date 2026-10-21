export interface TechnologyStep {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: 'wind' | 'layers' | 'sparkles';
}

export interface EditorialTile {
  id: string;
  title?: string;
  image: string;
  type: 'diagram' | 'photo';
  overlayText?: string;
  alt: string;
}

export interface ValidationBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: 'seal' | 'flask' | 'shield';
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  category: string;
  iconType: 'air' | 'odour' | 'lungs' | 'allergy' | 'clock' | 'leaf';
}

export interface TechnologyArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
    }[];
  };
}

export const TECHNOLOGY_DATA = {
  hero: {
    eyebrow: 'OUR TECHNOLOGY',
    title: 'The Science of Purified Air',
    description: 'Advanced 5-stage filtration. Intelligent sensing. Cleaner air for a healthier, brighter tomorrow.',
    buttonText: 'Explore Our Technology',
    image: '/images/technology/kiyoki-technology-hero.webp',
  },

  sciencePanel: {
    eyebrow: 'THE SCIENCE OF',
    highlight: 'Pure Air',
    paragraph: 'Kiyoki uses advanced filtration and intelligent air monitoring to capture and remove 99.97% of airborne pollutants as small as 0.3 microns — so you can breathe cleaner, healthier air every day, in every space.',
  },

  stepsSection: {
    headingPart1: 'How It Works, In ',
    headingHighlight: 'Three',
    headingPart2: ' Simple Steps',
    subtitle: 'From intake to clean air — a smarter, healthier process.',
    steps: [
      {
        number: '01',
        title: '1. Intake',
        description: 'Air is drawn in and pollutants are captured at multiple stages.',
        image: '/images/technology/step-intake.png',
        icon: 'wind',
      },
      {
        number: '02',
        title: '2. Purify',
        description: 'Advanced 5-stage filtration removes dust, allergens, odours and harmful gases.',
        image: '/images/filtration_exploded_graphic.png',
        icon: 'layers',
      },
      {
        number: '03',
        title: '3. Fresh Air',
        description: 'Clean, purified air is released back into your space for a healthier, safer environment.',
        image: '/images/technology/step-fresh-air.png',
        icon: 'sparkles',
      },
    ] as TechnologyStep[],
  },

  videoSection: {
    heading: 'Advanced Variable Anion Technology Explained',
    subtitle: "Watch how Kiyoki's advanced anion technology works to neutralize harmful particles, freshen your air and create a healthier living environment.",
    poster: '/images/technology/india-gate-sunset.png',
    duration: '03:15',
    buttonLabel: 'Watch the video',
    videoTitle: 'Kiyoki Variable Anion & Multi-Stage Filtration Explained',
    videoDescription: 'A detailed scientific overview of how negative air ions bind to micro-pollutants and PM2.5 particles, causing them to precipitate before they can enter your respiratory tract.',
  },

  natureSection: {
    eyebrow: 'INSPIRED BY NATURE',
    heading: 'Harness the Power of Nature to Purify the Air Around You',
    paragraphs: [
      "Kiyoki's variable anion technology replicates the natural purification process found in forests, waterfalls and mountains — where negative ions help remove airborne pollutants and refresh the air.",
      'By releasing a safe and balanced level of negative ions, Kiyoki helps particles like dust, pollen, smoke and odours clump together, making them easier to capture while creating a fresher, more natural environment.',
      'The result is cleaner, healthier air that feels as fresh as nature itself — right inside your home.',
    ],
    overlappingImages: {
      beach: {
        src: '/images/technology/nature-beach.png',
        alt: 'Tropical coastline rich in natural negative air ions',
      },
      waterfall: {
        src: '/images/technology/nature-waterfall.png',
        alt: 'Cascading mountain waterfall with fresh oxygenated mist',
      },
    },
    tiles: [
      {
        id: 'tile-process',
        type: 'diagram',
        image: '/images/technology/purification-diagram.png',
        alt: 'Scientific purification process infographic',
      },
      {
        id: 'tile-waterfall',
        type: 'photo',
        image: '/images/technology/nature-waterfall.png',
        overlayText: 'NATURAL PURIFICATION',
        alt: 'Natural waterfall representing pure atmospheric ionization',
      },
      {
        id: 'tile-home',
        type: 'photo',
        image: '/images/technology/clean-family-home.png',
        overlayText: 'CLEANER, HEALTHIER HOMES',
        alt: 'Modern sunlit living room with comfortable indoor air',
      },
    ] as EditorialTile[],
  },

  validationSection: {
    heading: 'Technology Tested at IIT Kanpur',
    subtitle: "Kiyoki's variable anion technology has been rigorously tested and validated at IIT Kanpur, confirming its effectiveness in reducing airborne pollutants and improving indoor air quality.",
    ctaText: 'View Test Report',
    badges: [
      {
        id: 'iit-kanpur',
        title: 'IIT KANPUR',
        subtitle: 'National Testing Facility',
        icon: 'seal',
      },
      {
        id: 'lab-tested',
        title: 'LAB TESTED',
        subtitle: '50 m³ Chamber Simulation',
        icon: 'flask',
      },
      {
        id: 'proven-results',
        title: 'PROVEN RESULTS',
        subtitle: '92.4% Clearance in 12 Mins',
        icon: 'shield',
      },
    ] as ValidationBadge[],
    reportDetails: {
      institution: 'Indian Institute of Technology Kanpur (IIT-K)',
      lab: 'National Aerosol & Particulate Research Facility',
      testStandard: 'ISO 29463 & ANSI/AHAM AC-1 Compliant Environmental Chamber',
      metrics: [
        { label: 'PM2.5 Removal (12 mins)', value: '92.4%' },
        { label: 'PM10 Clearance Rate', value: '96.8%' },
        { label: 'Formaldehyde & TVOC Reduction', value: '89.1%' },
        { label: 'Ozone Emission Standard', value: '< 0.002 ppm (Zero-Ozone)' },
      ],
      summary: 'Controlled tests conducted within a calibrated 50 m³ environmental simulation chamber confirmed rapid particulate precipitation upon activation of Kiyoki Variable Anion mode in tandem with the 5-Stage True HEPA H13 cartridge. In ambient smog loads mimicking AQI > 450, breathing zone particulate densities dropped by over 90% within 12 minutes of continuous operation.',
    },
  },

  benefitsSection: {
    eyebrow: 'A HEALTHIER TOMORROW',
    heading: 'Key Benefits of Variable Anion Technology',
    subtitle: 'More than just clean air — A complete solution for your health and well-being.',
    benefits: [
      {
        id: 'air-quality',
        title: 'Improves Air Quality',
        description: 'Removes PM2.5, dust, allergens and harmful gases for cleaner, fresher air.',
        category: 'Filtration',
        iconType: 'air',
      },
      {
        id: 'indoor-odours',
        title: 'Reduces Indoor Odours',
        description: 'Neutralizes unpleasant odours from cooking, pets, smoke and more.',
        category: 'Freshness',
        iconType: 'odour',
      },
      {
        id: 'better-breathing',
        title: 'Supports Better Breathing',
        description: 'Helps reduce allergy triggers and supports respiratory health.',
        category: 'Health',
        iconType: 'lungs',
      },
      {
        id: 'allergy-relief',
        title: 'Allergy & Asthma Relief',
        description: 'Helps create a safer environment for those with allergies and asthma.',
        category: 'Protection',
        iconType: 'allergy',
      },
      {
        id: 'continuous-protection',
        title: 'Continuous Protection',
        description: 'Works 24/7 to keep your indoor air clean and safe.',
        category: 'Reliability',
        iconType: 'clock',
      },
      {
        id: 'enhances-wellbeing',
        title: 'Enhances Well-being',
        description: 'Fresher air, better sleep and a healthier, more comfortable living space.',
        category: 'Lifestyle',
        iconType: 'leaf',
      },
    ] as BenefitCard[],
  },

  articlesSection: {
    heading: 'Read More About Our Technology',
    subtitle: 'Explore in-depth articles, research and the latest updates on air purification, anion technology and indoor air quality.',
    articles: [
      {
        id: 'indoor-air-pollution',
        title: 'Indoor Air Pollution in Urban India',
        description: 'Understand the major sources of indoor air pollution and how it affects your health.',
        image: '/images/technology/urban-pollution.png',
        readTime: '5 min read',
        date: 'October 2026',
        author: 'Dr. Alok Verma, Environmental Health Specialist',
        category: 'Urban Living & Health',
        content: {
          lead: 'While outdoor air quality across Indian metros frequently dominates news headlines with alarming AQI figures exceeding 400, scientific monitoring reveals that indoor air can often be up to 5 times more hazardous than the air outside.',
          sections: [
            {
              heading: 'The Hidden Infiltration of Micro-Pollutants',
              body: [
                'Modern urban homes in cities such as Delhi NCR, Mumbai, Bengaluru, and Kolkata are built with sealed windows and central air conditioning systems. However, fine particulate matter (PM2.5 and PM0.3) penetrates through structural micro-gaps, doorways, and HVAC air intakes.',
                'Once trapped inside, these particles combine with internal emission sources—including LPG cooking exhaust, incense smoke, pet dander, and volatile organic compounds (VOCs) emitted by paints, furnishings, and electronic hardware.',
              ],
            },
            {
              heading: 'Health Impacts on Vulnerable Occupants',
              body: [
                'Continuous inhalation of trapped particulate matter inflames the epithelial lining of the lungs, triggers persistent nighttime coughing, aggravates asthmatic episodes in children, and disrupts deep REM sleep cycles.',
                'The World Health Organization (WHO) has classified prolonged indoor PM2.5 exposure as a leading risk factor for chronic respiratory conditions and cardiovascular strain.',
              ],
            },
            {
              heading: 'How Multi-Stage Filtration Solves the Crisis',
              body: [
                "KIYOKI purifiers address this continuous threat through high-velocity dual-intake architecture. By pulling contaminated air through medical-grade True HEPA H13 media and activated carbon honeycomb grids, 99.97% of particulates down to 0.3 microns are permanently captured, restoring indoor air to alpine purity standards.",
              ],
            },
          ],
        },
      },
      {
        id: 'negative-ions-science',
        title: 'How Negative Ions Improve Air Quality',
        description: 'Learn the science behind negative ions and their role in cleaner, healthier air.',
        image: '/images/technology/negative-ions.png',
        readTime: '6 min read',
        date: 'October 2026',
        author: 'Kiyoki Aerodynamic & Materials R&D Team',
        category: 'Aerosol Science',
        content: {
          lead: "Ever wondered why air feels remarkably crisp, energizing, and restorative after a thunderstorm or near a crashing mountain waterfall? The scientific secret lies in negative air ions (NAIs)—nature's microscopic vacuum cleaners.",
          sections: [
            {
              heading: 'The Lenard Effect: Nature’s Pure Air Generator',
              body: [
                'In pristine wilderness, high kinetic collisions of water molecules (the Lenard Effect) strip electrons from surrounding air molecules, attaching them to oxygen molecules to form negative ions (O2⁻). In natural forests and mountain ranges, ion concentrations can reach 50,000 ions per cubic centimeter.',
                'In contrast, modern sealed urban apartments with computers, synthetics, and air conditioners often measure less than 100 ions per cubic centimeter, creating a heavy, stagnant atmosphere.',
              ],
            },
            {
              heading: 'Mechanics of Aerosol Agglomeration',
              body: [
                'Most airborne pollutants, dust particles, pollen grains, and droplet nuclei carry a positive electrostatic charge. When Kiyoki Variable Anion modules emit controlled, high-density negative ions into the room, these ions bond to the positive pollutants.',
                'Through Coulomb electrostatic attraction, the polarized particles clump together (agglomeration), becoming too heavy to remain suspended in your breathing space. They precipitate safely onto surfaces or get drawn directly into the purifier intake.',
              ],
            },
            {
              heading: 'Zero-Ozone Variable Emission Control',
              body: [
                'Traditional commercial ionizers often generate harmful ozone as a byproduct. Kiyoki engineers developed Variable Anion Technology using custom ceramic needle-point emitters operating at optimized pulse frequencies. Independent laboratory certification confirms ozone emissions remain beneath 0.002 ppm—well below the strictest international medical safety thresholds.',
              ],
            },
          ],
        },
      },
    ] as TechnologyArticle[],
  },
};
