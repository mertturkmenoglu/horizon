import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

type Props = React.ComponentPropsWithoutRef<'a'> & {
  category: string;
};

function Card({ className, category, ...props }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'browse-categories' });
  const href = `/categories/${encodeURIComponent(category)}`;

  return (
    <a
      href={href}
      className={cn(
        'rounded-md bg-gradient-to-br from-yellow-300 to-yellow-400 p-4 hover:bg-gradient-to-r',
        className
      )}
      {...props}
    >
      <div className="text-xl font-bold text-midnight">{category}</div>
      <div className="mb-4 mt-4 flex items-baseline space-x-2 md:mb-8">
        <div className="text-sm">{t('num-services', { count: 0 })}</div>
        <a
          href={href}
          className="text-xs font-bold hover:underline"
        >
          {t('see-all')}
        </a>
      </div>
    </a>
  );
}

export default Card;
