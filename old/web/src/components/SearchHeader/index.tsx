import { cn } from '@/lib/cn';
import ServiceSearch from '../ServiceSearch';

function SearchHeader({ className }: TProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col items-start', className)}>
      <ServiceSearch className="mt-0 w-full" />
    </div>
  );
}

export default SearchHeader;
