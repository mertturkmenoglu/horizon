import { cn } from '@/lib/cn';
import { ServiceCategory } from '@/lib/dto';

interface ServiceCategoryProps {
  cat: ServiceCategory;
  className?: string;
}

function CategoryCard({
  id,
  title,
  className,
}: {
  id: number;
  title: string;
  className?: string;
}): React.ReactElement {
  return (
    <a
      href={`/services?category=${id}`}
      className={cn(
        'border border-midnight p-4',
        'rounded-md flex justify-start items-center size-48',
        'focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
        'group',
        className
      )}
    >
      <div className="text-midnight">{title}</div>
    </a>
  );
}

function ServiceCategory({
  cat,
  className,
}: ServiceCategoryProps): React.ReactElement {
  return (
    <div className={cn('', className)}>
      <h2 className="font-bold text-2xl">{cat.category}</h2>
      <div className="flex space-x-4 mt-4">
        {cat.subcategories.map((c) => (
          <CategoryCard
            key={c.id}
            id={c.id}
            title={c.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceCategory;
