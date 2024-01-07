import { cn } from '@/lib/cn';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Logo2 from '../Logo2';

interface FancyGreetingProps {
  className?: string;
}

function FancyGreeting({ className }: FancyGreetingProps): React.ReactElement {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center relative',
        className
      )}
    >
      <a
        href="/"
        className="absolute top-8 left-8 flex items-center space-x-4 hover:underline"
      >
        <ArrowLeftIcon className="size-6" />
        <span>Home</span>
      </a>
      <img
        src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="hidden lg:flex lg:w-[384px] rounded z-50 shadow-2xl"
      />
      <div className="mt-32 lg:mt-0 flex-col items-start text-start w-[384px] z-50">
        <div className="text-gray-500 text-sm mt-8">Get Started</div>
        <div className="mt-2 font-bold text-2xl">
          People turn their ideas into reality with{' '}
          <span className="text-sky-500">Horizon</span>.
        </div>
      </div>

      <Logo2
        className="hidden lg:block lg:absolute lg:top-[30rem] lg:h-20"
        dist={6}
      />
    </div>
  );
}

export default FancyGreeting;
