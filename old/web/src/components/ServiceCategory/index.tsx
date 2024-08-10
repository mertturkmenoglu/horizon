import { TCategory } from '@/hooks/useCategoryData';
import { cn } from '@/lib/cn';
import { CategoryServiceCountDto } from '@/lib/dto/service';
import CategoryCard from '../CategoryCard';

interface ServiceCategoryProps {
  category: TCategory;
  className?: string;
  counts: CategoryServiceCountDto[];
}

function ServiceCategory({
  category,
  className,
  counts,
}: ServiceCategoryProps): React.ReactElement {
  return (
    <div className={cn('', className)}>
      <h2 className="text-2xl font-bold">{category.title}</h2>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {category.subcategories.map((c) => (
          <CategoryCard
            img={c.image}
            id={c.id}
            key={c.id}
            category={c.title}
            count={counts.find((r) => r.category === c.id)?.count ?? 0}
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceCategory;
