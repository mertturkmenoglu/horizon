import { cn } from '@/lib/cn';

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
      <img
        src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-[384px] rounded z-50 shadow-2xl"
      />
      <div className="flex flex-col items-start text-start w-[384px] z-50">
        <div className="text-gray-500 text-sm mt-2">Get Started</div>
        <div className="mt-8 font-bold text-2xl">
          People use to turn their ideas into reality with{' '}
          <span className="text-sky-500">Horizon</span>.
        </div>
      </div>

      <div className="bg-red-700 w-[48rem] h-24 -skew-x-[32deg] -rotate-[24deg] absolute top-[26rem] shadow-2xl shadow-red-700/80"></div>
      <div className="bg-sky-500 w-[48rem] h-24 -skew-x-[32deg] -rotate-[24deg] absolute top-[38rem] shadow-2xl shadow-sky-500/80"></div>
    </div>
  );
}

export default FancyGreeting;