import Logo from '@/components/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

function AuthLayout({ children, title }: AuthLayoutProps): React.ReactElement {
  return (
    <main className="mt-16 flex w-full flex-col lg:flex-row">
      <div className="mx-auto flex flex-col items-start justify-center">
        <div className="min-w-96">
          <Logo className="-ml-4 h-16 w-16" />
          <div className="mt-4 text-2xl font-extrabold">
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
