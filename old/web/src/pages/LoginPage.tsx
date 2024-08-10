import LoginForm from '@/components/Auth/LoginForm';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

function LoginPage(): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <MainLayout>
      <AuthLayout title={t('login-title')}>
        <LoginForm className="mt-4" />
      </AuthLayout>
    </MainLayout>
  );
}

export default LoginPage;
