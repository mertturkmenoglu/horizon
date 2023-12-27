import Logo from '@/components/Logo';
import { cn } from '@/lib/cn';

function NotFoundPage(): React.ReactElement {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div></div>
      <Logo />
      <h2 className="text-4xl font-extrabold">Horizon</h2>
      <div className="text-red-500 text-2xl font-light mt-16">
        404 - Not Found
      </div>

      <a
        href="/"
        className={cn(
          'bg-red-700 w-[18rem] h-12',
          '-skew-x-[32deg] -rotate-6',
          'shadow-2xl shadow-red-700/80',
          'mt-12 text-white text-2xl',
          'flex items-center px-8',
          'transform transition-all ease-in-out duration-500',
          'hover:skew-x-0 hover:rotate-0',
          'focus:skew-x-0 focus:rotate-0',
          'focus:ring focus:ring-red-700 focus:ring-offset-2 focus:outline-none'
        )}
      >
        Go to Home
      </a>
      <a
        href="/help"
        className={cn(
          'bg-sky-500 w-[18rem] h-12',
          '-skew-x-[32deg] -rotate-6',
          'shadow-2xl shadow-sky-500/80',
          'mt-6 text-white text-2xl',
          'flex items-center px-8',
          'transform transition-all ease-in-out duration-500',
          'hover:skew-x-0 hover:rotate-0',
          'focus:skew-x-0 focus:rotate-0',
          'focus:ring focus:ring-sky-500 focus:ring-offset-2 focus:outline-none'
        )}
      >
        Help
      </a>
    </div>
  );
}

export default NotFoundPage;
