import FancyGreeting from '@/components/Auth/FancyGreeting';
import Logo from '@/components/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

function AuthLayout({ children, title }: AuthLayoutProps): React.ReactElement {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <FancyGreeting className=" lg:w-1/2" />

      <div className="hidden lg:flex w-[1px] bg-gray-500 h-screen" />

      <div className="mt-16 lg:mt-0 lg:h-screen lg:w-1/2 flex flex-col justify-center items-start mx-auto lg:px-32 xl:px-64">
        <div className="min-w-96">
          <Logo className="w-16 h-16 -ml-4" />
          <div className="text-2xl font-extrabold mt-16">
            <div>Hey,</div>
            {title}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
