import LoginForm from '@/components/Auth/LoginForm';
import AuthLayout from '@/layouts/AuthLayout';
import { useTranslation } from 'react-i18next';

function LoginPage(): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <AuthLayout title={t('login-title')}>
      <LoginForm className="mt-16" />
    </AuthLayout>
  );
}

export default LoginPage;
