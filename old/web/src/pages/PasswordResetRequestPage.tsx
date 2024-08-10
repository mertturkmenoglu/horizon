import PasswordResetRequestForm from '@/components/Auth/PasswordResetRequestForm';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

function PasswordResetRequestPage(): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <MainLayout>
      <AuthLayout title={t('password-reset-title')}>
        <PasswordResetRequestForm className="mt-4" />
      </AuthLayout>
    </MainLayout>
  );
}

export default PasswordResetRequestPage;
