export type ServiceCategory = {
  category: string;
  subcategories: ServiceSubcategory[];
};

export type ServiceSubcategory = {
  id: number;
  title: string;
};

export const categories: ServiceCategory[] = [
  {
    category: 'Home Services',
    subcategories: [
      { id: 1, title: 'Plumbing' },
      { id: 2, title: 'Electrical work' },
      { id: 3, title: 'Painting' },
      { id: 4, title: 'Cleaning' },
      { id: 5, title: 'Pest control' },
      { id: 6, title: 'Landscaping' },
    ],
  },
  {
    category: 'Professional Services',
    subcategories: [
      { id: 7, title: 'Legal advice' },
      { id: 8, title: 'Accounting and financial services' },
      { id: 9, title: 'Consulting' },
      { id: 10, title: 'Marketing and advertising' },
      { id: 11, title: 'Web development and IT services' },
    ],
  },
  {
    category: 'Health and Wellness',
    subcategories: [
      { id: 12, title: 'Personal training' },
      { id: 13, title: 'Nutrition consulting' },
      { id: 14, title: 'Massage therapy' },
      { id: 15, title: 'Counselling and therapy' },
      { id: 16, title: 'Yoga and fitness classes' },
    ],
  },
  {
    category: 'Education and Tutoring',
    subcategories: [
      { id: 17, title: 'Academic tutoring' },
      { id: 18, title: 'Language lessons' },
      { id: 19, title: 'Music and arts lessons' },
      { id: 20, title: 'Test Preparation' },
      { id: 21, title: 'Online courses and workshops' },
    ],
  },
  {
    category: 'Events and Entertainment',
    subcategories: [
      { id: 22, title: 'Event planning and coordination' },
      { id: 23, title: 'Photography and Videography' },
      { id: 24, title: 'DJ and music services' },
      { id: 25, title: 'Catering and food services' },
      { id: 26, title: 'Venue booking' },
    ],
  },
  {
    category: 'Automotive Services',
    subcategories: [
      { id: 27, title: 'Auto repair and maintenance' },
      { id: 28, title: 'Car detailing' },
      { id: 29, title: 'Towing and roadside assistance' },
      { id: 30, title: 'Vehicle inspection' },
    ],
  },
  {
    category: 'Beauty and Personal Care',
    subcategories: [
      { id: 31, title: 'Hairdressing and styling' },
      { id: 32, title: 'Makeup and beauty services' },
      { id: 33, title: 'Spa and wellness treatments' },
      { id: 34, title: 'Nail care' },
    ],
  },
  {
    category: 'Real Estate and Property Services',
    subcategories: [
      { id: 35, title: 'Property management' },
      { id: 36, title: 'Home inspection' },
      { id: 37, title: 'Real estate brokerage' },
      { id: 38, title: 'Rental and leasing services' },
    ],
  },
  {
    category: 'Technology and Digital Services',
    subcategories: [
      { id: 39, title: 'Software development' },
      { id: 40, title: 'Graphic design' },
      { id: 41, title: 'Digital Marketing' },
      { id: 42, title: 'Social media management' },
    ],
  },
  {
    category: 'Retail and Shopping Services',
    subcategories: [
      { id: 43, title: 'Personal shopping' },
      { id: 44, title: 'Online shopping assistance' },
      { id: 45, title: 'Product reviews and recommendations' },
    ],
  },
];

export function getCategoryTitle(id: number): string {
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.id === id) {
        return subcategory.title;
      }
    }
  }

  return '';
}
