import { Props as NavItemProps } from './item';

import {
  AwardIcon,
  BathIcon,
  CarFrontIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  HomeIcon,
  LaptopIcon,
  PartyPopperIcon,
  ShoppingBagIcon,
  WarehouseIcon,
} from 'lucide-react';

const base = 'search?locations[refinementList][tags][0]=';

const data = [
  {
    href: `${base}home-services`,
    category: 'Home Services',
    img: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a',
    text: 'Home',
    icon: HomeIcon,
  },
  {
    href: `${base}professional-services`,
    category: 'Professional Services',
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    text: 'Professional',
    icon: AwardIcon,
  },
  {
    href: `${base}health-and-wellness`,
    category: 'Health and Wellness',
    img: 'https://images.unsplash.com/photo-1557433127-5e3aba6e9e71',
    text: 'Health',
    icon: HeartPulseIcon,
  },
  {
    href: `${base}education-and-tutoring`,
    category: 'Education and Tutoring',
    img: 'https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe',
    text: 'Education',
    icon: GraduationCapIcon,
  },
  {
    href: `${base}events-and-entertainment`,
    category: 'Events and Entertainment',
    img: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852',
    text: 'Events',
    icon: PartyPopperIcon,
  },
  {
    href: `${base}automotive-services`,
    category: 'Automotive Services',
    img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1200',
    text: 'Automotive',
    icon: CarFrontIcon,
  },
  {
    href: `${base}beauty-and-personal-care`,
    category: 'Beauty and Personal Care',
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',
    text: 'Beauty',
    icon: BathIcon,
  },
  {
    href: `${base}real-estate-and-property-services`,
    category: 'Real Estate and Property Services',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    text: 'Real Estate',
    icon: WarehouseIcon,
  },
  {
    href: `${base}technology-and-digital-services`,
    category: 'Technology and Digital Services',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    text: 'Technology',
    icon: LaptopIcon,
  },
  {
    href: `${base}retail-and-shopping-services`,
    category: 'Retail and Shopping Services',
    img: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735',
    text: 'Shopping',
    icon: ShoppingBagIcon,
  },
] satisfies NavItemProps[];

export default data;
