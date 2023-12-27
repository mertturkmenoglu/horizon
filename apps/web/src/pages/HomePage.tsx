import Appbar from '@/components/Appbar';
import { cn } from '@/lib/cn';

function HomePage(): React.ReactElement {
  return (
    <div className="max-w-7xl mx-auto">
      <Appbar className="mt-4" />

      <div className="mt-16 relative">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-[384px] object-cover blur-[2px] brightness-50 rounded-md"
        />
        <div className="absolute bottom-16 px-16 w-full">
          <div className="mt-16 text-white text-4xl font-medium">
            What service do you need?
          </div>

          <input
            type="text"
            className={cn(
              'w-full',
              'px-4 py-2 mt-4',
              'rounded-md bg-white/50 text-stone-700',
              'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
              'placeholder:text-white/50'
            )}
            placeholder="e.g: plumbing, baby sitter, etc..."
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
