import { useTranslation } from 'react-i18next';

export type TCategory = {
  id: number;
  category: string;
  image: string;
  subcategories: TSubcategory[];
};

export type TSubcategory = {
  id: number;
  title: string;
  image: string;
};

export type TCategoryData = {
  data: TCategory[];
};

export function useCategoryData() {
  const { t } = useTranslation('categories');

  const categoryData: TCategoryData = {
    data: [
      {
        id: 0,
        category: t('categories:main-categories.0.text'),
        image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a',
        subcategories: [
          {
            id: 10,
            title: t('categories:subcategories.0.title'),
            image:
              'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39',
          },
          {
            id: 11,
            title: t('categories:subcategories.1.title'),
            image:
              'https://images.unsplash.com/photo-1621905251918-48416bd8575a',
          },
          {
            id: 12,
            title: t('categories:subcategories.2.title'),
            image:
              'https://images.unsplash.com/photo-1599619585752-c3edb42a414c',
          },
          {
            id: 13,
            title: t('categories:subcategories.3.title'),
            image:
              'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50',
          },
          {
            id: 14,
            title: t('categories:subcategories.4.title'),
            image:
              'https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7',
          },
          {
            id: 15,
            title: t('categories:subcategories.5.title'),
            image:
              'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9',
          },
        ],
      },
      {
        id: 1,
        category: t('categories:main-categories.1.text'),
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
        subcategories: [
          {
            id: 16,
            title: t('categories:subcategories.6.title'),
            image:
              'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
          },
          {
            id: 17,
            title: t('categories:subcategories.7.title'),
            image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07',
          },
          {
            id: 18,
            title: t('categories:subcategories.8.title'),
            image:
              'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2',
          },
          {
            id: 19,
            title: t('categories:subcategories.9.title'),
            image:
              'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
          },
          {
            id: 20,
            title: t('categories:subcategories.10.title'),
            image:
              'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
          },
        ],
      },
      {
        id: 2,
        category: t('categories:main-categories.2.text'),
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
        subcategories: [
          {
            id: 21,
            title: t('categories:subcategories.11.title'),
            image:
              'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?',
          },
          {
            id: 22,
            title: t('categories:subcategories.12.title'),
            image:
              'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
          },
          {
            id: 23,
            title: t('categories:subcategories.13.title'),
            image: 'https://images.unsplash.com/photo-1556760544-74068565f05c',
          },
          {
            id: 24,
            title: t('categories:subcategories.14.title'),
            image:
              'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1',
          },
          {
            id: 25,
            title: t('categories:subcategories.15.title'),
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
          },
        ],
      },
      {
        id: 3,
        category: t('categories:main-categories.3.text'),
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        subcategories: [
          {
            id: 26,
            title: t('categories:subcategories.16.title'),
            image: 'https://images.unsplash.com/photo-1546953304-5d96f43c2e94',
          },
          {
            id: 27,
            title: t('categories:subcategories.17.title'),
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
          },
          {
            id: 28,
            title: t('categories:subcategories.18.title'),
            image:
              'https://images.unsplash.com/photo-1459908676235-d5f02a50184b',
          },
          {
            id: 29,
            title: t('categories:subcategories.19.title'),
            image:
              'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b',
          },
          {
            id: 30,
            title: t('categories:subcategories.20.title'),
            image:
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
          },
        ],
      },
      {
        id: 4,
        category: t('categories:main-categories.4.text'),
        image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852',
        subcategories: [
          {
            id: 31,
            title: t('categories:subcategories.21.title'),
            image:
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
          },
          {
            id: 32,
            title: t('categories:subcategories.22.title'),
            image:
              'https://images.unsplash.com/photo-1599143286278-645439b288fd',
          },
          {
            id: 33,
            title: t('categories:subcategories.23.title'),
            image:
              'https://images.unsplash.com/photo-1517814761483-6769dab4e9c0',
          },
          {
            id: 34,
            title: t('categories:subcategories.24.title'),
            image:
              'https://images.unsplash.com/photo-1480455454781-1af590be2a58',
          },
          {
            id: 35,
            title: t('categories:subcategories.25.title'),
            image:
              'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
          },
        ],
      },
      {
        id: 5,
        category: t('categories:main-categories.5.text'),
        image:
          'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1200',
        subcategories: [
          {
            id: 36,
            title: t('categories:subcategories.26.title'),
            image:
              'https://images.unsplash.com/photo-1487754180451-c456f719a1fc',
          },
          {
            id: 37,
            title: t('categories:subcategories.27.title'),
            image:
              'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93',
          },
          {
            id: 38,
            title: t('categories:subcategories.28.title'),
            image:
              'https://images.unsplash.com/photo-1655220711988-430a51a5c254',
          },
          {
            id: 39,
            title: t('categories:subcategories.29.title'),
            image:
              'https://images.unsplash.com/photo-1625055930842-b9ad84b7facd',
          },
        ],
      },
      {
        id: 6,
        category: t('categories:main-categories.6.text'),
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',
        subcategories: [
          {
            id: 40,
            title: t('categories:subcategories.30.title'),
            image:
              'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8',
          },
          {
            id: 41,
            title: t('categories:subcategories.31.title'),
            image:
              'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
          },
          {
            id: 42,
            title: t('categories:subcategories.32.title'),
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
          },
          {
            id: 43,
            title: t('categories:subcategories.33.title'),
            image:
              'https://images.unsplash.com/photo-1522337660859-02fbefca4702',
          },
        ],
      },
      {
        id: 7,
        category: t('categories:main-categories.7.text'),
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        subcategories: [
          {
            id: 44,
            title: t('categories:subcategories.34.title'),
            image:
              'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
          },
          {
            id: 45,
            title: t('categories:subcategories.35.title'),
            image:
              'https://images.unsplash.com/photo-1484154218962-a197022b5858',
          },
          {
            id: 46,
            title: t('categories:subcategories.36.title'),
            image:
              'https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357',
          },
          {
            id: 47,
            title: t('categories:subcategories.37.title'),
            image:
              'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff',
          },
        ],
      },
      {
        id: 8,
        category: t('categories:main-categories.8.text'),
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        subcategories: [
          {
            id: 48,
            title: t('categories:subcategories.38.title'),
            image:
              'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6',
          },
          {
            id: 49,
            title: t('categories:subcategories.39.title'),
            image:
              'https://images.unsplash.com/photo-1626785774573-4b799315345d',
          },
          {
            id: 50,
            title: t('categories:subcategories.40.title'),
            image: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
          },
          {
            id: 51,
            title: t('categories:subcategories.41.title'),
            image:
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
          },
        ],
      },
      {
        id: 9,
        category: t('categories:main-categories.9.text'),
        image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735',
        subcategories: [
          {
            id: 52,
            title: t('categories:subcategories.42.title'),
            image:
              'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0',
          },
          {
            id: 53,
            title: t('categories:subcategories.43.title'),
            image:
              'https://images.unsplash.com/photo-1423666639041-f56000c27a9a',
          },
          {
            id: 54,
            title: t('categories:subcategories.44.title'),
            image:
              'https://images.unsplash.com/photo-1609405098950-3244ab505ed2',
          },
        ],
      },
    ],
  };

  return categoryData;
}
