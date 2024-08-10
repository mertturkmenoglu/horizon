import { z } from 'zod';

export const serviceSubcategorySchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const serviceCategorySchema = z.object({
  category: z.string(),
  subcategories: z.array(serviceSubcategorySchema),
});

export const getServiceCategoriesResponseSchema = z.array(
  serviceCategorySchema
);

export type GetServiceCategoriesResponse = {
  data: z.infer<typeof getServiceCategoriesResponseSchema>;
};

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

export type ServiceSubcategory = z.infer<typeof serviceSubcategorySchema>;
