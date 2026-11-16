export interface EnvironmentalSlide {
  id: string;
  number: string;
  title: string;
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
    number: '1',
    title: 'Clean Air Equity & Environmental Justice',
    paragraphs: [
      'Air pollution and climate emergencies disproportionately affect marginalized urban communities living near industrial corridors and congested highways. At Kiyoki, we are founded on the conviction that access to clean, breathable air is not a luxury privilege—it is a fundamental environmental and human right.',
      'By pairing advanced aerosol physics with accessible, low-power ionization architecture, Kiyoki democratizes sub-micron protection. We actively collaborate with grassroots community initiatives to monitor ambient PM2.5 hotspots and deploy active mitigation tools where they are needed most.',
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
    number: '2',
    title: 'Zero Harmful Ozone & Circular Lifecycle',
    paragraphs: [
      'Many traditional purifiers rely on electrostatic plates that generate hazardous secondary ground-level ozone. Kiyoki’s active ionization operates with complete environmental integrity: releasing beneficial negative air ions with zero detectable ozone, zero harsh chemicals, and zero toxic byproducts.',
      'Our custom brushless DC motors consume under 35 watts—saving up to 85% more electricity than conventional systems. Combined with recyclable thermoplastic casings and long-life filter matrices, our hardware is engineered to minimize carbon footprints and curtail e-waste.',
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
    number: '3',
    title: 'Active Reforestation & Biosphere Stewardship',
    paragraphs: [
      "The name 'Kiyoki' honors the Japanese philosophy of pure forest sanctuaries and the living vitality of trees. To give back to the biospheres that inspire our technology, we partner with verified ecological programs to plant a biodiverse native tree for every purifier deployed.",
      'These reforestation corridors restore wildlife habitats and establish enduring carbon sinks. We extend this circular ethos into 100% plastic-free packaging, utilizing unbleached recycled kraft cardboard and biodegradable molded pulp cushions.',
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
    number: '4',
    title: 'Empirical Validation & Open Air Science',
    paragraphs: [
      'True environmental stewardship demands unwavering empirical accountability. Kiyoki conducts independent aerosol dispersion validation in collaboration with institutions like IIT Kanpur, ensuring every clean-air metric is supported by peer-reviewed science.',
      'We reject closed ecosystems. Our integrated optical PM2.5 and TVOC sensors deliver transparent real-time telemetry to families, while anonymized regional trends help environmental researchers map urban hotspots and advocate for cleaner municipal skies.',
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
