import RegisterForm from '@/components/Auth/RegisterForm';
import AuthLayout from '@/layouts/AuthLayout';

function RegisterPage(): React.ReactElement {
  return (
    <AuthLayout title="Register Now.">
      <RegisterForm className="mt-16" />
    </AuthLayout>
  );
}

export default RegisterPage;
