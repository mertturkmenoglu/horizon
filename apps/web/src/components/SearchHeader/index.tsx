import { cn } from '@/lib/cn';
import ServiceSearch from '../ServiceSearch';

function SearchHeader({ className }: TProps): React.ReactElement {
  return (
    <div className={cn('flex flex-col items-start w-full', className)}>
      <ServiceSearch className="mt-0 w-full" />
    </div>
  );
}

export default SearchHeader;
