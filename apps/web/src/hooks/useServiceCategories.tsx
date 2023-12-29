import { api } from '@/lib/api';
import {
  GetServiceCategoriesResponse,
  ServiceCategory,
  getServiceCategoriesResponseSchema,
} from '@/lib/dto';
import { useEffect, useState } from 'react';

type UseServiceCategoriesReturn =
  | {
      isLoading: true;
      categories: null;
    }
  | {
      isLoading: false;
      categories: ServiceCategory[];
    };

export function useServiceCategories(): UseServiceCategoriesReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ServiceCategory[] | null>(() => {
    try {
      const ssValue = window.sessionStorage.getItem('serviceCategories');

      if (ssValue === null) {
        return null;
      }

      const result = getServiceCategoriesResponseSchema.safeParse(ssValue);

      if (result.success) {
        return result.data;
      }

      return null;
    } catch (err) {
      return null;
    }
  });

  useEffect(() => {
    if (categories !== null) {
      setIsLoading(false);
      return;
    }

    api<GetServiceCategoriesResponse>('/services/categories')
      .then((res) => {
        setCategories(res.data);
        window.sessionStorage.setItem(
          'serviceCategories',
          JSON.stringify(res.data)
        );
      })
      .catch(() => setCategories(null))
      .finally(() => setIsLoading(false));
  }, [categories, setCategories, setIsLoading]);

  if (isLoading) {
    return {
      isLoading: true,
      categories: null,
    };
  }

  return { isLoading: false, categories: categories! };
}
