export interface EnvironmentalSlide {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  metricsBadge: string;
  paragraphs: string[];
  leftImage: {
    src: string;
    alt: string;
    label: string;
  };
  rightImage: {
    src: string;
    alt: string;
    label: string;
  };
}

export const ABOUT_ENVIRONMENTAL_SLIDES: EnvironmentalSlide[] = [
  {
    id: 'environmental-justice',
    number: '01',
    category: 'COMMUNITY & EQUITY',
    title: 'Clean Air Equity & Environmental Justice',
    tagline: 'Ensuring pure, uncompromised air is a universal right, not a luxury privilege.',
    metricsBadge: 'Protecting Vulnerable Communities • Sub-Micron Filtration',
    paragraphs: [
      'Air pollution and climate emergencies disproportionately affect marginalized urban neighborhoods and vulnerable populations living near dense industrial corridors and congested highways. At Kiyoki, we are founded on the conviction that access to clean, breathable air is not a luxury commodity—it is a fundamental environmental and human right.',
      'For decades, high-performance air purification was out of reach for everyday families. By pairing advanced aerosol physics with accessible, low-power ionization architecture, Kiyoki democratizes sub-micron filtration. We actively collaborate with grassroots ecological groups and community health initiatives to monitor ambient PM2.5 hotspots and deploy active mitigation tools where they are needed most.',
      'Our mission bridges the divide between environmental challenges and everyday human well-being, proving that meaningful technology must serve both people and the planet.',
    ],
    leftImage: {
      src: '/images/about/env-urban-smog.jpg',
      alt: 'Dense urban smog and wildfire haze over a sprawling metropolitan hillside',
      label: 'Atmospheric Reality: Urban Haze Burden',
    },
    rightImage: {
      src: '/images/about/env-industrial-smoke.jpg',
      alt: 'Industrial smokestacks emitting plumes into the overcast sky',
      label: 'Industrial Emissions & Climate Impact',
    },
  },
  {
    id: 'sustainable-engineering',
    number: '02',
    category: 'SUSTAINABLE ENGINEERING',
    title: 'Zero Harmful Ozone, Low Energy & Circular Lifecycle',
    tagline: 'Purification without secondary indoor pollutants or wasteful power consumption.',
    metricsBadge: '< 0.001 ppm Ozone (100% Safe) • < 35W Power Draw',
    paragraphs: [
      'Many conventional purifiers rely on harsh electrostatic plates or synthetic chemical scents that inadvertently generate ground-level ozone and volatile secondary organic emissions. Kiyoki’s active ionization operates with complete environmental integrity: generating beneficial negative air ions with zero detectable ozone, zero harsh chemicals, and zero hazardous byproducts.',
      'Our purifiers utilize custom ultra-low-friction brushless DC motors that draw less electrical power than a standard LED reading lamp (under 35 watts at full capacity). By drastically curtailing energy consumption, a home running Kiyoki 24/7 saves up to 85% more electricity compared to legacy air cleaners, lightening regional grid strain and household carbon footprints.',
      'Furthermore, our modular chassis are crafted using recyclable, toxin-free thermoplastic polymers and high-efficiency long-life filter matrices, engineered to drastically reduce premature landfill accumulation and e-waste.',
    ],
    leftImage: {
      src: '/images/about/env-lush-forest.jpg',
      alt: 'Pristine temperate rainforest canopy with morning sunlight streaming through leaves',
      label: "Nature's Blueprint: Canopy Ionization",
    },
    rightImage: {
      src: '/images/about/env-clean-energy.jpg',
      alt: 'Modern wind turbines spinning cleanly over rolling green hills',
      label: 'Ultra-Low Energy: 85% Lower Power Draw',
    },
  },
  {
    id: 'reforestation-stewardship',
    number: '03',
    category: 'BIOSPHERE STEWARDSHIP',
    title: 'One Purifier, One Native Tree: Active Reforestation',
    tagline: 'Restoring natural carbon sinks and revitalizing regional biodiversity.',
    metricsBadge: '1 Unit = 1 Native Tree Planted • 100% Recyclable Packaging',
    paragraphs: [
      "The name 'Kiyoki' is inspired by ancient Japanese reverence for pure forest canopies ('Kiyo' meaning pure, and 'Ki' meaning tree and living spirit). We believe that technological innovation must actively replenish the natural ecosystems that inspire our design.",
      'Through our verified global reforestation partnership, a native biodiverse tree is planted for every Kiyoki air purifier deployed. These reforestation corridors restore critical wildlife habitats, revitalize degraded topsoil, and establish enduring carbon sinks that naturally scrub hundreds of tons of carbon dioxide and particulate matter from our atmosphere.',
      'We extend this circular ethos into our supply chain: all Kiyoki product boxes are manufactured with 100% recycled unbleached kraft cardboard, printed with non-toxic soy-based inks, and utilize biodegradable molded pulp cushions—completely eliminating expanded polystyrene foam from our shipping pipeline.',
    ],
    leftImage: {
      src: '/images/about/env-misty-mountains.jpg',
      alt: 'Majestic pine trees rising from morning mist along a rugged mountain ridge',
      label: 'Living Forests: Natural Carbon Sinks',
    },
    rightImage: {
      src: '/images/about/env-tree-planting.jpg',
      alt: 'Caring hands gently planting a vibrant green sapling into rich forest soil',
      label: '1 Unit = 1 Native Tree Planted',
    },
  },
  {
    id: 'scientific-transparency',
    number: '04',
    category: 'RESEARCH & ADVOCACY',
    title: 'Empirical Validation & Open Air-Quality Science',
    tagline: 'Open data, academic validation, and empowering informed community action.',
    metricsBadge: 'Verified by IIT Kanpur • Open-Source Telemetry',
    paragraphs: [
      'True ecological commitment requires unwavering scientific accountability. Kiyoki works alongside leading academic researchers, including independent aerosol dispersion validation conducted at IIT Kanpur, ensuring that every performance claim is backed by rigorous empirical data.',
      'We reject opaque marketing. Our devices integrate precision laser optical PM2.5 and TVOC sensors that deliver real-time, transparent air quality metrics to users without requiring proprietary subscriptions. We believe that when people can visibly see what is in their air, they make better choices for their homes, their families, and their local environment.',
      'By sharing aggregated, anonymized air quality trends with municipal environmental researchers, Kiyoki helps map urban pollution hotspots and supports evidence-based policy advocacy for cleaner skies and stricter industrial emission standards.',
    ],
    leftImage: {
      src: '/images/about/env-clean-skyline.jpg',
      alt: 'Modern sustainable city with green rooftops under crystal blue skies',
      label: 'Vision: Clean Skies & Livable Cities',
    },
    rightImage: {
      src: '/images/about/env-science-lab.jpg',
      alt: 'Clean environmental aerosol testing laboratory chamber with precision sensors',
      label: 'Empirical Verification: IIT Kanpur Tested',
    },
  },
];
