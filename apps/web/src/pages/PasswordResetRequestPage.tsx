import PasswordResetRequestForm from '@/components/Auth/PasswordResetRequestForm';
import AuthLayout from '@/layouts/AuthLayout';
import { useTranslation } from 'react-i18next';

function PasswordResetRequestPage(): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <AuthLayout title={t('password-reset-title')}>
      <PasswordResetRequestForm className="mt-16" />
    </AuthLayout>
  );
}

export default PasswordResetRequestPage;
