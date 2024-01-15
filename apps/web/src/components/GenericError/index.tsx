import { useTranslation } from 'react-i18next';

function GenericError({ className }: TProps): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'error' });
  return <div className={className}>{t('err')}</div>;
}

export default GenericError;
