import FancyGreeting from '@/components/Auth/FancyGreeting';
import Logo from '@/components/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

function AuthLayout({ children, title }: AuthLayoutProps): React.ReactElement {
  return (
    <main className="flex h-screen w-full flex-col lg:flex-row">
      <FancyGreeting className=" lg:w-1/2" />

      <div className="hidden h-screen w-[1px] bg-gray-500 lg:flex" />

      <div className="mx-auto mt-16 flex flex-col items-start justify-center lg:mt-0 lg:h-screen lg:w-1/2 lg:px-32 xl:px-64">
        <div className="min-w-96">
          <Logo className="-ml-4 h-16 w-16" />
          <div className="mt-16 text-2xl font-extrabold">
            <div>Hey,</div>
            <h1>{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
