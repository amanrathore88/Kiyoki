/** Edit product information here. Prices/specifications are mockup content until confirmed. */
export type ProductId = 'x3' | 'x5' | 'x8';

export type Product = {
  id: ProductId;
  model: string;
  subtitle: string;
  price: number;
  badge: string;
  room: string;
  image: string;
  highlights: [string, string, string];
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'x3',
    model: 'Kiyoki X3',
    subtitle: 'Compact. Quiet. Perfect for smaller spaces.',
    price: 14990,
    badge: 'Best for Bedrooms',
    room: 'Small rooms',
    image: 'product-x3.webp',
    highlights: ['Ideal for bedrooms & small rooms', 'Ultra-quiet performance', 'True HEPA filtration'],
    description: 'A compact purifier made for the places where you relax, sleep, and unwind.',
  },
  {
    id: 'x5',
    model: 'Kiyoki X5',
    subtitle: 'The perfect balance for modern family spaces.',
    price: 18990, // Replace with the approved selling price before launch.
    badge: 'Most Popular',
    room: 'Medium rooms',
    image: 'product-x5.webp',
    highlights: ['Ideal for medium-sized rooms', 'Smart control & air quality indicator', 'True HEPA filtration'],
    description: 'Everyday performance designed to complement the modern family home.',
  },
  {
    id: 'x8',
    model: 'Kiyoki X8',
    subtitle: 'Powerful purification for larger spaces.',
    price: 24990,
    badge: 'Best for Large Spaces',
    room: 'Large rooms',
    image: 'product-x8.webp',
    highlights: ['Ideal for large rooms & open spaces', 'High CADR for faster purification', 'True HEPA filtration'],
    description: 'High-capacity air care for spacious living rooms and open-plan spaces.',
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
