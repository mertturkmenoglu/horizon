import { useCategoryData } from '@/hooks/useCategoryData';
import { useMemo } from 'react';
import { priceUnits, timespans } from './useForm';

export function useOptions() {
  const categories = useCategoryData();

  const subcategories = useMemo(() => {
    return categories.data.map((c) => c.subcategories).flat();
  }, [categories]);

  const category = useMemo(() => {
    return subcategories.map((c) => ({
      value: c.id,
      label: c.title,
    }));
  }, [subcategories]);

  const price = priceUnits.map((u) => ({
    value: u,
    label: u,
  }));

  const timespan = timespans.map((t, i) => ({
    value: i,
    label: t,
  }));

  return {
    category,
    price,
    timespan,
  };
}
