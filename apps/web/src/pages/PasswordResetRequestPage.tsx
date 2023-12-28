import PasswordResetRequestForm from '@/components/Auth/PasswordResetRequestForm';
import AuthLayout from '@/layouts/AuthLayout';

function PasswordResetRequestPage(): React.ReactElement {
  return (
    <AuthLayout title="Forgot your password?">
      <PasswordResetRequestForm className="mt-16" />
    </AuthLayout>
  );
}

export default PasswordResetRequestPage;
