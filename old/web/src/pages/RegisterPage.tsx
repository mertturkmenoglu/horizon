import RegisterForm from '@/components/Auth/RegisterForm';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

function RegisterPage(): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <MainLayout>
      <AuthLayout title={t('register-title')}>
        <RegisterForm className="mt-4" />
      </AuthLayout>
    </MainLayout>
  );
}

export default RegisterPage;
