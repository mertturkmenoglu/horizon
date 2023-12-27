import FancyGreeting from '@/components/Auth/FancyGreeting';
import LoginForm from '@/components/Auth/LoginForm';
import Logo from '@/components/Logo';

function LoginPage(): React.ReactElement {
  return (
    <div className="w-full h-screen flex">
      <FancyGreeting className="w-1/2" />

      <div className="w-[1px] bg-gray-500 h-screen" />

      <div className="h-screen w-1/2 flex flex-col justify-center items-start px-64">
        <div className="min-w-96">
          <Logo className="w-16 h-16 -ml-4" />
          <div className="text-2xl font-extrabold mt-16">
            <div>Hey,</div>
            <div>Login Now.</div>
          </div>

          <LoginForm className="mt-16" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
