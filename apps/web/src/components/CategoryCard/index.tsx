import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = React.ComponentPropsWithoutRef<'a'> & {
  category: string;
};

function CategoryCard({ className, category, ...props }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'browse-categories' });
  const href = `/categories/${encodeURIComponent(category)}`;

  return (
    <Link
      to={href}
      className={cn(
        'rounded-md bg-gradient-to-br from-yellow-300 to-yellow-400 p-4 hover:bg-gradient-to-r',
        className
      )}
      {...props}
    >
      <div className="text-xl font-bold text-midnight">{category}</div>
      <div className="mb-4 mt-4 flex items-baseline space-x-2 md:mb-8">
        <div className="text-sm">{t('num-services', { count: 0 })}</div>
      </div>
    </Link>
  );
}

export default CategoryCard;
