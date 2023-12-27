import LoginForm from '@/components/Auth/LoginForm';
import AuthLayout from '@/layouts/AuthLayout';

function LoginPage(): React.ReactElement {
  return (
    <AuthLayout title="Login Now.">
      <LoginForm className="mt-16" />
    </AuthLayout>
  );
}

export default LoginPage;
