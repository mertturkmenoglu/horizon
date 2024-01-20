import { TBreadcrumbItem } from '@/components/Breadcrumb';
import { useCategoryData } from '@/hooks/useCategoryData';
import { GetServiceByIdResponse } from '@/lib/dto/service';

export function useBreadcrumb(service: GetServiceByIdResponse) {
  const categoryData = useCategoryData();
  const flattenCategories = categoryData.data
    .map((c) => [c, c.subcategories].flat())
    .flat();

  const category =
    flattenCategories.find((c) => c.id === service.category) ?? null;

  const breadcrumbItems: TBreadcrumbItem[] = [
    {
      href: `/categories/${encodeURIComponent(
        category?.title ?? ''
      )}?id=${category?.id}`,
      text: category?.title ?? '',
      capitalize: true,
    },
    {
      href: '#',
      text: service.title.toLocaleLowerCase() ?? '',
      capitalize: true,
    },
  ];

  return breadcrumbItems;
}
