import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Props } from '.';
import Chip from './Chip';

const unitToSymbol: Record<string, string> = {
  USD: '$',
  TRY: '₺',
};

function Chips({ service, className }: Props): React.ReactElement {
  const { t } = useTranslation('common', {
    keyPrefix: 'recommendation-grid',
  });

  const fmtPrice = `${service.price}${unitToSymbol[service.priceUnit]}`;

  return (
    <div className={cn('flex flex-wrap justify-end gap-2', className)}>
      <Chip
        type="price"
        text={t('price', { price: fmtPrice })}
      />

      {service.isPopular && (
        <Chip
          type="topRated"
          text={t('top-rated')}
        />
      )}

      {service.isNew && !service.isPopular && (
        <Chip
          type="new"
          text={t('new')}
        />
      )}

      {service.user.isVerifiedAccount &&
        !service.isPopular &&
        !service.isNew && (
          <Chip
            type="pro"
            text={t('pro')}
          />
        )}
    </div>
  );
}

export default Chips;
