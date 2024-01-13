import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = React.ComponentPropsWithoutRef<'a'> & {
  category: string;
  img: string;
};

function CategoryCard({ className, category, img, ...props }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'browse-categories' });
  const href = `/categories/${encodeURIComponent(category)}`;

  return (
    <Link
      to={href}
      className={cn('rounded-md', className)}
      {...props}
    >
      <img
        src={img}
        alt=""
        className="aspect-[2] rounded-t-md object-cover"
      />
      <div className="mt-2 text-xl font-bold">{category}</div>
      <div className="mb-4 mt-1 flex items-baseline space-x-2 md:mb-8">
        <div className="text-sm">{t('num-services', { count: 0 })}</div>
      </div>
    </Link>
  );
}

export default CategoryCard;
