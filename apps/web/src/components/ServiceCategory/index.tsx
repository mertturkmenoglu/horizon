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
        'flex size-48 items-center justify-start rounded-md',
        'focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
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
      <h2 className="text-2xl font-bold">{cat.category}</h2>
      <div className="mt-4 flex space-x-4">
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
