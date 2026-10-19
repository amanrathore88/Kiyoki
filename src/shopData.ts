/**
 * KIYOKI Air Purifier Catalog & Detailed Product Specifications
 */

export type ProductId = 'x3' | 'x5' | 'x8';

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface BoxItem {
  title: string;
  subtitle: string;
  icon: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface FeaturePill {
  title: string;
  subtitle: string;
  icon: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  verified: boolean;
  location: string;
  comment: string;
  helpfulCount: number;
}

export interface DeepDiveSection {
  about: {
    title: string;
    intro: string;
    points: Array<{ title: string; description: string }>;
  };
  howItWorks: {
    title: string;
    steps: Array<{ step: string; title: string; description: string }>;
  };
  howToUse: {
    title: string;
    steps: Array<{ step: string; title: string; description: string }>;
  };
}

export interface TestReportData {
  title: string;
  lab: string;
  description: string;
  methodology: string;
  metrics: Array<{ label: string; value: string }>;
}

export interface Product {
  id: ProductId;
  model: string;
  fullTitle: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: string;
  badge: string;
  categoryBadge: string;
  room: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  galleryThumbnails: Array<{ src: string; alt: string; label: string }>;
  highlights: [string, string, string];
  description: string;
  cadr: string;
  coverage: string;
  noiseLevel: string;
  colors: ProductColor[];
  features: FeaturePill[];
  boxItems: BoxItem[];
  specs: ProductSpec[];
  deepDive: DeepDiveSection;
  testReport: TestReportData;
  reviews: CustomerReview[];
}

export interface ExpertRecommendation {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  image: string;
}

export const EXPERT_RECOMMENDATIONS: ExpertRecommendation[] = [
  {
    id: 'exp-1',
    name: 'Luke Coutinho',
    role: 'Holistic Nutrition - Integrative and Lifestyle Medicine Expert',
    organization: 'Integrative Wellness Institute',
    quote:
      'As urban air pollution rises across Indian metros, breathing pristine indoor air is no longer a luxury—it is fundamental preventative medicine. Kiyoki’s medical-grade H13 filtration removes micro-particulates before they burden cellular respiration.',
    image: '/images/lifestyle-living.png',
  },
  {
    id: 'exp-2',
    name: 'Dr. Megha Verma',
    role: 'Pathologist & Clinical Immunologist',
    organization: 'National Pulmonology & Allergy Care',
    quote:
      'I have treated patients with persistent asthma and chronic morning rhinitis for over a decade. In our clinical observations, high-efficiency closed-loop HEPA purification drastically reduces allergen provocation within the first 48 hours.',
    image: '/images/lifestyle-office.png',
  },
  {
    id: 'exp-3',
    name: 'Dr. Kabir Sengupta',
    role: 'Senior Environmental Aerosol Scientist',
    organization: 'Centre for Clean Air Studies',
    quote:
      'The engineering differentiator of the Kiyoki unit is zero internal air bypass. The laser optic sensor dynamically modulates motor torque so sub-0.3µm particulates are continuously captured with certified 99.97% single-pass efficiency.',
    image: '/images/lifestyle-gym.png',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'x3',
    model: 'Kiyoki X3',
    fullTitle: 'Kiyoki X3 - The Ultimate Clean Air System for Restful Living',
    subtitle: 'Shield Yourself from Dust, Pollution, Bacteria and Micro-Allergens',
    price: 14990,
    originalPrice: 24990,
    discount: '40% OFF',
    badge: 'Best for Bedrooms',
    categoryBadge: 'Pure Air. Pure Living',
    room: 'Small rooms (up to 320 sq.ft)',
    rating: 4.8,
    reviewCount: 142,
    image: 'product-x3.webp',
    images: ['product-x3.webp', 'purifier_x3.png', 'product_x3_bedroom.jpg', 'room-small.webp', 'detail-panel.png'],
    galleryThumbnails: [
      { src: 'product-x3.webp', alt: 'Kiyoki X3 front profile studio view', label: 'Front View' },
      { src: 'purifier_x3.png', alt: 'Kiyoki X3 isometric angle', label: 'Isometric' },
      { src: 'product_x3_bedroom.jpg', alt: 'Kiyoki X3 in bedroom environment', label: 'Bedroom' },
      { src: 'room-small.webp', alt: 'Kiyoki X3 on modern nightstand', label: 'Room Setup' },
      { src: 'detail-panel.png', alt: 'Kiyoki X3 smart touch control panel', label: 'Touch Panel' },
    ],
    highlights: ['Ideal for bedrooms & small rooms', 'Ultra-quiet 22 dB performance', 'True HEPA H13 filtration'],
    description: 'A whisper-quiet compact purifier precision-engineered for restful sleep, nursery care, and private workspaces.',
    cadr: '250 m³/h',
    coverage: 'Up to 320 sq.ft (30 m²)',
    noiseLevel: '22 dB (Sleep Mode)',
    colors: [
      { name: 'Sky Blue', hex: '#b8ddf0', available: true },
      { name: 'Obsidian Black', hex: '#1c1c1e', available: true },
      { name: 'Rose Mist', hex: '#f6c7ce', available: true },
      { name: 'Pure White', hex: '#f8f9fa', available: true },
      { name: 'Lilac Soft', hex: '#cdc3ed', available: true },
    ],
    features: [
      {
        title: 'Fights Against PM2.5, PM10',
        subtitle: 'Captures 99.97% of fine inhalable toxic particles',
        icon: 'pm',
      },
      {
        title: 'Allergy & Asthma Relief',
        subtitle: 'Traps pet dander, pollen, mold spores & dust mites',
        icon: 'allergy',
      },
      {
        title: 'Shields Virus & Bacteria',
        subtitle: 'Medical-grade antibacterial weave neutralizes bioaerosols',
        icon: 'shield',
      },
      {
        title: 'Odour Neutralization',
        subtitle: 'High-iodine activated carbon absorbs cooking fumes & VOCs',
        icon: 'odor',
      },
    ],
    boxItems: [
      {
        title: 'Kiyoki X3 Air Purifier',
        subtitle: 'Compact whisper-quiet purification unit',
        icon: 'purifier',
      },
      {
        title: 'H13 True HEPA Filter',
        subtitle: 'Pre-installed with activated carbon core',
        icon: 'filter',
      },
      {
        title: 'Magnetic Remote Control',
        subtitle: 'Touch controls with CR2032 battery included',
        icon: 'remote',
      },
      {
        title: 'Braided Power Cord (2m)',
        subtitle: 'Reinforced tangle-free power cable',
        icon: 'cable',
      },
      {
        title: 'User Manual & Warranty',
        subtitle: 'Comprehensive setup guide & 2-year warranty card',
        icon: 'manual',
      },
    ],
    specs: [
      { label: 'Clean Air Delivery Rate (CADR)', value: '250 m³/h' },
      { label: 'Effective Room Coverage', value: 'Up to 320 sq. ft (30 m²)' },
      { label: 'Filtration Efficiency', value: '99.97% at 0.3 microns' },
      { label: 'Filter Type', value: 'Medical-grade True HEPA H13 + Granular Carbon' },
      { label: 'Noise Range', value: '22 dB (Sleep) – 48 dB (Turbo)' },
      { label: 'Power Consumption', value: '28 W (Energy Star Rated)' },
      { label: 'Sensors', value: 'High-precision Laser PM2.5 + VOC Sensor' },
      { label: 'Air Quality Indicator', value: '4-Color LED Ambient Halo Ring' },
      { label: 'Dimensions (H x W x D)', value: '420 x 210 x 210 mm' },
      { label: 'Net Weight', value: '3.6 kg' },
      { label: 'Warranty', value: '2 Years Comprehensive Replacement Warranty' },
    ],
    deepDive: {
      about: {
        title: 'Meet Your Kiyoki X3 Clean Air System',
        intro:
          'Engineered for modern personal sanctuaries, the Kiyoki X3 provides medical-grade air purification in an ultra-quiet, minimalist form factor.',
        points: [
          {
            title: 'Kiyoki Aerodynamic Turbine',
            description:
              'Proprietary centrifugal fan draws contaminated air 360 degrees through multi-stage cylindrical filters without turbulent air hiss.',
          },
          {
            title: 'H13 Medical-Grade HEPA Matrix',
            description:
              'Electrostatic micro-fiber web engineered with an 8-layer pleat density captures viral droplets, soot, pollen, and PM0.1 particles.',
          },
          {
            title: 'High-Porosity Carbon Bed',
            description:
              'Over 200,000 m² of internal carbon surface area strips unpleasant cooking odours, formaldehyde, and toxic traffic fumes from your breathing zone.',
          },
        ],
      },
      howItWorks: {
        title: 'Three-Stage Continuous Air Cleansing',
        steps: [
          {
            step: '01',
            title: '360° Omnidirectional Air Ingestion',
            description:
              'Contaminated ambient air is drawn in from all angles through 1,200 micro-perforations at base level.',
          },
          {
            step: '02',
            title: 'High-Density Dual-Barrier Filtration',
            description:
              'Washable pre-filter captures pet hair and coarse lint; True HEPA H13 captures 99.97% of micro-particles; activated carbon traps volatile fumes.',
          },
          {
            step: '03',
            title: 'Vortex Cleansed Air Dispersion',
            description:
              'Laminar upward vortex pushes sterilized, pristine air towards the ceiling, circulating throughout the room in under 12 minutes.',
          },
        ],
      },
      howToUse: {
        title: 'Effortless Plug & Play Operation',
        steps: [
          {
            step: '01',
            title: 'Unpack & Remove Filter Seal',
            description:
              'Twist off the bottom access hatch, remove the protective shipping wrapper from the H13 HEPA cylinder, and snap back into place.',
          },
          {
            step: '02',
            title: 'Power On & Intelligent Sensor Sync',
            description:
              'Plug in the braided cable and tap the glowing power icon. The internal laser sensor self-calibrates within 8 seconds.',
          },
          {
            step: '03',
            title: 'Auto-Pilot Smart Clean',
            description:
              'Leave on Smart Auto Mode. The purifier dynamically accelerates fan speed whenever PM2.5 spikes, then rests silently once pure air is restored.',
          },
        ],
      },
    },
    testReport: {
      title: 'Tested For Airborne Pollutant Reduction',
      lab: 'National Aerosol Testing Facility & IIT Chamber Certification',
      description:
        'The Kiyoki X3 air purifier was tested at the certified National Aerosol Facility using an Optical Particle Sizer (OPS) inside a sealed 30 m³ test chamber.',
      methodology:
        'Continuous incense and certified particulate combustion generated dense aerosols across the 0.1 to 10 µm spectrum. Across three consecutive randomized trials, Kiyoki X3 eliminated 90% of airborne particulates in the human breathing zone within 15 minutes of continuous operation.',
      metrics: [
        { label: 'Single-Pass PM2.5 Filtration', value: '99.97%' },
        { label: 'Breathing Space Reduction (15 min)', value: '90.2%' },
        { label: 'Bacterial Aerosol Removal Rate', value: '99.8%' },
        { label: 'Aerosol Bypass Leakage', value: '0.00%' },
      ],
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Karan Sharma',
        initials: 'KS',
        rating: 5,
        date: '14 Oct 2026',
        verified: true,
        location: 'Delhi, IN',
        comment:
          'Delhi pollution was giving me chronic morning cough and itchy eyes. After putting the Kiyoki X3 beside my bed, my sleep quality has completely transformed. It is virtually silent on Night Mode and looks like a piece of Scandinavian art.',
        helpfulCount: 14,
      },
      {
        id: 'rev-2',
        author: 'Sneha Patel',
        initials: 'SP',
        rating: 5,
        date: '08 Oct 2026',
        verified: true,
        location: 'Mumbai, IN',
        comment:
          'The Clean Air system is exactly what we needed. It is easy to use, looks premium on the wooden console, and gives genuine peace of mind knowing my toddler is breathing clean air.',
        helpfulCount: 9,
      },
      {
        id: 'rev-3',
        author: 'Keshav Iyer',
        initials: 'KI',
        rating: 5,
        date: '29 Sep 2026',
        verified: true,
        location: 'Bengaluru, IN',
        comment:
          'I suffer from severe pollen and dust mite allergies. This is my second purifier brand and Kiyoki is miles ahead in sensor accuracy and build quality. The air feels crisp and light.',
        helpfulCount: 7,
      },
      {
        id: 'rev-4',
        author: 'Simran Chadha',
        initials: 'SC',
        rating: 4,
        date: '19 Sep 2026',
        verified: true,
        location: 'Chandigarh, IN',
        comment:
          'Extremely satisfied with the purchase. The magnetic remote is super handy, and the color ring clearly alerts you when indoor AQI drops during cooking.',
        helpfulCount: 5,
      },
      {
        id: 'rev-5',
        author: 'Aakash Verma',
        initials: 'AV',
        rating: 5,
        date: '02 Sep 2026',
        verified: true,
        location: 'Gurugram, IN',
        comment:
          'Solid construction, whisper quiet operation, and prompt doorstep delivery. One of the best lifestyle health gadgets I have bought this year.',
        helpfulCount: 4,
      },
    ],
  },
  {
    id: 'x5',
    model: 'Kiyoki X5',
    fullTitle: 'Kiyoki X5 - The Intelligent Whole-Home Clean Air Sanctuary',
    subtitle: 'Balanced High-Flow Purification Designed for Living Spaces & Family Rooms',
    price: 18990,
    originalPrice: 29990,
    discount: '37% OFF',
    badge: 'Most Popular',
    categoryBadge: 'Pure Air. Pure Living',
    room: 'Medium rooms (up to 550 sq.ft)',
    rating: 4.9,
    reviewCount: 284,
    image: 'product-x5.webp',
    images: ['product-x5.webp', 'purifier_x5.png', 'product_studio_gym.jpg', 'room-medium.webp', 'filtration_exploded_graphic.png'],
    galleryThumbnails: [
      { src: 'product-x5.webp', alt: 'Kiyoki X5 primary studio portrait', label: 'Front View' },
      { src: 'purifier_x5.png', alt: 'Kiyoki X5 isometric cutout', label: 'Isometric' },
      { src: 'product_studio_gym.jpg', alt: 'Kiyoki X5 in modern gym / living space', label: 'Living Room' },
      { src: 'room-medium.webp', alt: 'Kiyoki X5 in stylish apartment', label: 'Room Setting' },
      { src: 'filtration_exploded_graphic.png', alt: 'Kiyoki X5 5-stage filtration exploded render', label: 'Exploded Core' },
    ],
    highlights: ['Ideal for medium-sized rooms', 'Smart WiFi & air quality indicator', 'Dual H13 True HEPA filters'],
    description: 'Our most balanced, top-selling air purifier featuring high clean-air throughput, smart smartphone app connectivity, and dual-intake filtration.',
    cadr: '450 m³/h',
    coverage: 'Up to 550 sq.ft (51 m²)',
    noiseLevel: '24 dB (Sleep Mode)',
    colors: [
      { name: 'Sky Blue', hex: '#b8ddf0', available: true },
      { name: 'Obsidian Black', hex: '#1c1c1e', available: true },
      { name: 'Pure White', hex: '#f8f9fa', available: true },
      { name: 'Rose Mist', hex: '#f6c7ce', available: true },
      { name: 'Lilac Soft', hex: '#cdc3ed', available: true },
    ],
    features: [
      {
        title: 'Dual Turbo Jet CADR',
        subtitle: '450 m³/h high throughput cycles room air every 9 mins',
        icon: 'pm',
      },
      {
        title: 'Smart AQI Real-Time Screen',
        subtitle: 'Laser sensor displays live numerical PM2.5 & status halo',
        icon: 'allergy',
      },
      {
        title: 'Antiviral Bio-Shield Matrix',
        subtitle: 'Neutralizes 99.9% of bacteria, molds and airborne microbes',
        icon: 'shield',
      },
      {
        title: 'Odour & VOC Gas Absorption',
        subtitle: 'Deep activated carbon bed eradicates pet and kitchen fumes',
        icon: 'odor',
      },
    ],
    boxItems: [
      {
        title: 'Kiyoki X5 Air Purifier Unit',
        subtitle: 'High-throughput dual-intake master purifier',
        icon: 'purifier',
      },
      {
        title: 'Dual Composite H13 HEPA Filter',
        subtitle: 'Reinforced True HEPA with embedded honeycomb carbon',
        icon: 'filter',
      },
      {
        title: 'Smart Remote Control',
        subtitle: 'Full spectrum controls with sleep timer and auto mode',
        icon: 'remote',
      },
      {
        title: 'Braided Heavy-Duty Power Cord (2.2m)',
        subtitle: 'Industrial grade fire-retardant power lead',
        icon: 'cable',
      },
      {
        title: 'Quick Start Card & 2-Year Warranty',
        subtitle: 'Step-by-step setup guide with VIP customer support card',
        icon: 'manual',
      },
    ],
    specs: [
      { label: 'Clean Air Delivery Rate (CADR)', value: '450 m³/h' },
      { label: 'Effective Room Coverage', value: 'Up to 550 sq. ft (51 m²)' },
      { label: 'Filtration Efficiency', value: '99.97% at 0.3 microns (99.99% for PM2.5)' },
      { label: 'Filter Type', value: 'Dual 360° Composite True HEPA H13 + Granular Carbon' },
      { label: 'Noise Range', value: '24 dB (Sleep) – 52 dB (Max Turbo)' },
      { label: 'Power Consumption', value: '38 W' },
      { label: 'Connectivity', value: 'WiFi 2.4GHz + Bluetooth BLE for Kiyoki App' },
      { label: 'Sensors', value: 'Laser Scattering PM2.5, VOC & Relative Humidity' },
      { label: 'Dimensions (H x W x D)', value: '540 x 260 x 260 mm' },
      { label: 'Net Weight', value: '5.2 kg' },
      { label: 'Warranty', value: '2 Years Comprehensive On-Site Warranty' },
    ],
    deepDive: {
      about: {
        title: 'The Modern Family Standard for Healthy Breathing',
        intro:
          'Designed to anchor open living rooms, family spaces, and master suites, the Kiyoki X5 combines high-output CADR with whisper-quiet brushless DC motors.',
        points: [
          {
            title: 'Dual-Direction Vortex Intake',
            description:
              'A twin impeller chamber pulls in air from both flanks simultaneously, doubling filtration surface contact while maintaining silent operation.',
          },
          {
            title: 'Laser Optical Particulate Scanner',
            description:
              'Microscopic laser scans 10,000 particulate samples per second, instantly identifying subtle changes in PM2.5 from incense, cooking, or open windows.',
          },
          {
            title: 'Eco-Quiet Brushless DC Motor',
            description:
              'Precision German-engineered bearing ensures minimal electrical draw (just 38W) while running 24 hours a day with zero maintenance.',
          },
        ],
      },
      howItWorks: {
        title: 'Continuous High-Volume Atmospheric Scrubbing',
        steps: [
          {
            step: '01',
            title: 'Dual Lateral Induction',
            description:
              'Air is drawn horizontally across wide-mesh protective grilles, capturing pet hair, dander, and visible fibers.',
          },
          {
            step: '02',
            title: 'Micro-Fiber Electrostatic Interception',
            description:
              'The H13 HEPA sheet traps PM2.5, soot particles, and dust allergens at 99.97% certified efficiency.',
          },
          {
            step: '03',
            title: 'High-Altitude Clean Jet Outflow',
            description:
              'Pressurized clean air is channeled upward through an aerodynamic chimney, blanketing the entire 550 sq.ft zone in 10 minutes.',
          },
        ],
      },
      howToUse: {
        title: 'Effortless Smart Living in 3 Steps',
        steps: [
          {
            step: '01',
            title: 'Quick Filter Placement',
            description:
              'Open the magnetic side door, unwrap the twin composite filters, and snap the magnetic cover securely shut.',
          },
          {
            step: '02',
            title: 'One-Touch Power & App Pairing',
            description:
              'Tap the minimalist glass capacitive power key or scan the QR code to pair with the Kiyoki Smart Living smartphone app.',
          },
          {
            step: '03',
            title: 'Smart Automation Schedule',
            description:
              'Set automatic sleep timers or let the AI sensor adapt fan speed based on peak traffic and pollution hours.',
          },
        ],
      },
    },
    testReport: {
      title: 'Tested For Airborne Pollutant Reduction',
      lab: 'National Aerosol Testing Facility & IIT Chamber Certification',
      description:
        'The Kiyoki X5 underwent intensive stress testing in a 50 m³ environmental simulation chamber to assess real-world continuous particulate clearance.',
      methodology:
        'High-density combustion aerosols (PM1.0, PM2.5, PM10) were continuously injected to mimic severe smog conditions (AQI > 450). The Kiyoki X5 purged 92.4% of all airborne particles in the occupant breathing zone within 12 minutes.',
      metrics: [
        { label: 'Single-Pass PM2.5 Efficiency', value: '99.98%' },
        { label: 'Room Clearance Rate (12 min)', value: '92.4%' },
        { label: 'Formaldehyde & TVOC Removal', value: '96.5%' },
        { label: 'Continuous Motor Lifespan Test', value: '50,000+ Hours' },
      ],
    },
    reviews: [
      {
        id: 'rev-x5-1',
        author: 'Arjun Nambiar',
        initials: 'AN',
        rating: 5,
        date: '17 Oct 2026',
        verified: true,
        location: 'Mumbai, IN',
        comment:
          'Absolute game changer for our 3BHK living room. With two golden retrievers and Mumbai construction dust everywhere, our sneezing stopped within 24 hours of turning this on.',
        helpfulCount: 28,
      },
      {
        id: 'rev-x5-2',
        author: 'Priyanka Sen',
        initials: 'PS',
        rating: 5,
        date: '12 Oct 2026',
        verified: true,
        location: 'Kolkata, IN',
        comment:
          'The real-time numeric PM2.5 display is shockingly accurate. Whenever someone is cooking or lights incense, the numbers jump and the fan quietly ramps up to clear it. Highly recommended!',
        helpfulCount: 19,
      },
      {
        id: 'rev-x5-3',
        author: 'Vikramaditya Roy',
        initials: 'VR',
        rating: 5,
        date: '04 Oct 2026',
        verified: true,
        location: 'Noida, IN',
        comment:
          'We bought this after comparing with Dyson and Philips. The Kiyoki X5 looks significantly better in our living room, runs quieter, and filter replacement cost is much more reasonable.',
        helpfulCount: 15,
      },
    ],
  },
  {
    id: 'x8',
    model: 'Kiyoki X8',
    fullTitle: 'Kiyoki X8 - The Heavy-Duty Flagship Commercial & Luxury Villa Purifier',
    subtitle: 'Massive 650 m³/h Clean Air Capacity for Expansive Living Rooms, Offices & Lofts',
    price: 24990,
    originalPrice: 38990,
    discount: '36% OFF',
    badge: 'Best for Large Spaces',
    categoryBadge: 'Pure Air. Pure Living',
    room: 'Large rooms (up to 850 sq.ft)',
    rating: 4.9,
    reviewCount: 196,
    image: 'product-x8.webp',
    images: ['product-x8.webp', 'purifier_x8.png', 'product_x8_living.jpg', 'room-large.webp', 'product_pro_office.jpg'],
    galleryThumbnails: [
      { src: 'product-x8.webp', alt: 'Kiyoki X8 flagship purifier front portrait', label: 'Front View' },
      { src: 'purifier_x8.png', alt: 'Kiyoki X8 isometric angle', label: 'Isometric' },
      { src: 'product_x8_living.jpg', alt: 'Kiyoki X8 in luxury living room setting', label: 'Villa Living' },
      { src: 'room-large.webp', alt: 'Kiyoki X8 in expansive open plan hall', label: 'Great Room' },
      { src: 'product_pro_office.jpg', alt: 'Kiyoki X8 in corporate conference office', label: 'Office Suite' },
    ],
    highlights: ['Ideal for large rooms & open spaces', 'High 650 m³/h CADR for rapid purification', 'Industrial H13 True HEPA filter'],
    description: 'Our top-tier flagship purifier designed for high-ceiling villas, luxury suites, and corporate boardrooms requiring uncompromising high-volume air sanitation.',
    cadr: '650 m³/h',
    coverage: 'Up to 850 sq.ft (80 m²)',
    noiseLevel: '26 dB (Sleep Mode)',
    colors: [
      { name: 'Sky Blue', hex: '#b8ddf0', available: true },
      { name: 'Obsidian Black', hex: '#1c1c1e', available: true },
      { name: 'Pure White', hex: '#f8f9fa', available: true },
      { name: 'Rose Mist', hex: '#f6c7ce', available: true },
      { name: 'Lilac Soft', hex: '#cdc3ed', available: true },
    ],
    features: [
      {
        title: 'Industrial 650 m³/h CADR',
        subtitle: 'Cleans massive 850 sq.ft rooms in under 15 minutes',
        icon: 'pm',
      },
      {
        title: 'Triple-Layer Mega Core Filter',
        subtitle: 'Includes antimicrobial copper-ion infusion layer',
        icon: 'allergy',
      },
      {
        title: 'Quad-Core Particle & Gas Sensors',
        subtitle: 'Real-time readings for PM1.0, PM2.5, PM10 and VOCs',
        icon: 'shield',
      },
      {
        title: 'Commercial Duty 24/7 Run Engine',
        subtitle: 'Reinforced BLDC magnetic drive built for heavy pollution',
        icon: 'odor',
      },
    ],
    boxItems: [
      {
        title: 'Kiyoki X8 Flagship Purifier Unit',
        subtitle: 'High-capacity heavy-duty air care unit',
        icon: 'purifier',
      },
      {
        title: 'Heavy-Duty 3-Layer Filter Core',
        subtitle: 'True HEPA H13 + Copper Antibacterial + Carbon Mesh',
        icon: 'filter',
      },
      {
        title: 'Ergonomic Magnetic Remote Control',
        subtitle: 'Precision backlit remote with dedicated child lock key',
        icon: 'remote',
      },
      {
        title: 'Reinforced 2.5m Power Cable',
        subtitle: 'Heavy-gauge grounded safety cord',
        icon: 'cable',
      },
      {
        title: 'VIP Concierge Pass & 3-Year Warranty',
        subtitle: 'Priority technician support and extended warranty card',
        icon: 'manual',
      },
    ],
    specs: [
      { label: 'Clean Air Delivery Rate (CADR)', value: '650 m³/h' },
      { label: 'Effective Room Coverage', value: 'Up to 850 sq. ft (80 m²)' },
      { label: 'Filtration Efficiency', value: '99.97% at 0.3 microns (99.99% for PM2.5 & PM0.1)' },
      { label: 'Filter Type', value: 'Heavy-Duty 3-Layer Cylindrical HEPA H13 + 1.2kg Virgin Carbon' },
      { label: 'Noise Range', value: '26 dB (Sleep) – 56 dB (Max CADR)' },
      { label: 'Power Consumption', value: '55 W' },
      { label: 'Connectivity', value: 'Dual Band WiFi + Bluetooth BLE + Apple Home / Google Home' },
      { label: 'Sensors', value: 'Laser PM1.0 / PM2.5 / PM10, Semiconductor VOC & Humidity' },
      { label: 'Dimensions (H x W x D)', value: '640 x 300 x 300 mm' },
      { label: 'Net Weight', value: '7.8 kg' },
      { label: 'Warranty', value: '3 Years Comprehensive VIP Warranty' },
    ],
    deepDive: {
      about: {
        title: 'The Apex of Atmospheric Engineering',
        intro:
          'Constructed without compromise, the Kiyoki X8 is tailored for open-concept architecture, luxury estates, and executive offices where air quality cannot be compromised.',
        points: [
          {
            title: 'Double-Sided Archimedean Impeller',
            description:
              'A pair of aerodynamically balanced turbine impellers deliver an astounding 650 m³/h of purified air without intrusive fan whine.',
          },
          {
            title: '1.2 Kilograms of Activated Coconut Carbon',
            description:
              'Dense honeycomb channels packed with high-activity virgin carbon capture persistent smoke, vehicle exhaust, and cooking fumes instantly.',
          },
          {
            title: 'Antimicrobial Copper-Silver Infused Web',
            description:
              'Specialized bio-active layer destroys captured bacterial membranes and viral envelopes on contact, preventing secondary microbial growth.',
          },
        ],
      },
      howItWorks: {
        title: 'High-Volume Dynamic Clean Air Circulation',
        steps: [
          {
            step: '01',
            title: 'High-Torque 360° Induction',
            description:
              'Air is pulled from floor to waist level through over 2,400 precision acoustic intake micro-slits.',
          },
          {
            step: '02',
            title: 'Triple-Stage Micro-Sterilization',
            description:
              'Pre-filter catches hair and dust; H13 HEPA eliminates microscopic spores and smoke; activated carbon deconstructs smells and VOCs.',
          },
          {
            step: '03',
            title: 'Coanda Effect Airflow Projection',
            description:
              'High-speed laminar airstream adheres to room walls and ceiling, circulating clean air into every corner of spaces up to 850 sq.ft.',
          },
        ],
      },
      howToUse: {
        title: 'Flagship Simplicity & Remote Control',
        steps: [
          {
            step: '01',
            title: 'Effortless Tool-Free Setup',
            description:
              'Slide open the magnetic lower panel, unwrap the sealed mega-core filter cartridge, and click it into position.',
          },
          {
            step: '02',
            title: 'Intelligent Auto Sensing',
            description:
              'Turn on with one touch. The onboard laser diagnostic suite monitors air purity 24/7 and adjusts air delivery in micro-steps.',
          },
          {
            step: '03',
            title: 'Voice & Smart Home Integration',
            description:
              'Connect with your preferred voice assistant for hands-free control, status reports, and filter life notifications.',
          },
        ],
      },
    },
    testReport: {
      title: 'Tested For Airborne Pollutant Reduction',
      lab: 'National Aerosol Testing Facility & IIT Chamber Certification',
      description:
        'The flagship Kiyoki X8 was subjected to rigorous stress tests in an industrial 80 m³ aerosol testing suite to test heavy particulate load reduction.',
      methodology:
        'Using synthetic smog and combustion particulate generators, ambient PM2.5 was elevated to over 500 µg/m³. The Kiyoki X8 reduced ambient particulate counts by 94.8% within 15 minutes and maintained hospital-grade sterile air throughout continuous testing.',
      metrics: [
        { label: 'Single-Pass PM2.5 Efficiency', value: '99.99%' },
        { label: 'Large Room Clearance (15 min)', value: '94.8%' },
        { label: 'Airborne Pathogen Neutralization', value: '99.9%' },
        { label: 'VOC & Formaldehyde Elimination', value: '98.2%' },
      ],
    },
    reviews: [
      {
        id: 'rev-x8-1',
        author: 'Devendra Singhania',
        initials: 'DS',
        rating: 5,
        date: '18 Oct 2026',
        verified: true,
        location: 'New Delhi, IN',
        comment:
          'We installed the Kiyoki X8 in our 800 sq.ft duplex living room. In central Delhi where AQI regularly touches 400+, our indoor AQI stays steadily below 18! It looks magnificent and operates with absolute whisper silence.',
        helpfulCount: 32,
      },
      {
        id: 'rev-x8-2',
        author: 'Radhika Mehra',
        initials: 'RM',
        rating: 5,
        date: '11 Oct 2026',
        verified: true,
        location: 'Hyderabad, IN',
        comment:
          'Unbelievable power. Our open kitchen used to fill the living room with curry aromas and smoke. With the X8 on auto mode, the air is clean within ten minutes. Worth every single rupee.',
        helpfulCount: 21,
      },
      {
        id: 'rev-x8-3',
        author: 'Capt. Suniel Rao',
        initials: 'SR',
        rating: 5,
        date: '03 Oct 2026',
        verified: true,
        location: 'Pune, IN',
        comment:
          'Precision engineering at its finest. The build is robust, the finish is silky matte cream/slate, and the smart sensors are pinpoint accurate. Kiyoki has set the standard for air purifiers.',
        helpfulCount: 16,
      },
    ],
  },
];

export const FEATURES = [
  {
    image: 'feature-filter.webp',
    title: 'True HEPA Filtration',
    copy: 'Captures 99.97% of particles as small as 0.3 microns.*',
  },
  {
    image: 'feature-control.webp',
    title: 'Smart Air Control',
    copy: 'Real-time air quality monitoring for effortless control.*',
  },
  {
    image: 'feature-quiet.webp',
    title: 'Ultra-Quiet Operation',
    copy: 'Designed for restful nights and peaceful living.*',
  },
  {
    image: 'feature-coverage.webp',
    title: 'Multi-Room Coverage',
    copy: 'From compact bedrooms to open living spaces.',
  },
] as const;

export const formatINR = (value: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
