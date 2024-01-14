import { cn } from '@/lib/cn';
import CategoryCard from '../CategoryCard';
import { TCategory } from '@/hooks/useCategoryData';

interface ServiceCategoryProps {
  category: TCategory;
  className?: string;
}

function ServiceCategory({
  category,
  className,
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
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceCategory;
