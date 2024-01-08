import { cn } from '@/lib/cn';

interface RedirectProps {
  className?: string;
  text: string;
  href: string;
  targetText: string;
}

function Redirect({
  className,
  text,
  href,
  targetText,
}: RedirectProps): React.ReactElement {
  return (
    <div className={cn('mt-8 flex text-sm text-gray-900', className)}>
      <div>{text} / </div>
      <a
        href={href}
        className="ml-2 rounded hover:underline hover:decoration-sky-500 hover:decoration-2 focus:outline-none focus:ring focus:ring-sky-500"
      >
        {targetText}
      </a>
    </div>
  );
}

export default Redirect;
