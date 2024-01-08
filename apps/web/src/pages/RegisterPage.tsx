import RegisterForm from '@/components/Auth/RegisterForm';
import AuthLayout from '@/layouts/AuthLayout';
import { useTranslation } from 'react-i18next';

function RegisterPage(): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <AuthLayout title={t('register-title')}>
      <RegisterForm className="mt-16" />
    </AuthLayout>
  );
}

export default RegisterPage;
