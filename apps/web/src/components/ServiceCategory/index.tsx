import { cn } from '@/lib/cn';
import { ServiceCategory as ServiceCategoryDto } from '@/lib/dto';
import CategoryCard from '../CategoryCard';

interface ServiceCategoryProps {
  cat: ServiceCategoryDto;
  className?: string;
}

function ServiceCategory({
  cat,
  className,
}: ServiceCategoryProps): React.ReactElement {
  return (
    <div className={cn('', className)}>
      <h2 className="text-2xl font-bold">{cat.category}</h2>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {cat.subcategories.map((c) => (
          <CategoryCard
            key={c.id}
            category={c.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceCategory;
