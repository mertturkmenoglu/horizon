import { cn } from '@/lib/cn';
import Logo from '../Logo';
import ServiceSearch from '../ServiceSearch';

function SearchHeader({ className }: TProps): React.ReactElement {
  return (
    <div className={cn('pr-4 flex items-start w-full mt-4', className)}>
      <div className="hidden md:flex items-center space-x-2 mt-2">
        <Logo className="size-8" />
        <div>Horizon</div>
      </div>
      <ServiceSearch className="ml-4 md:ml-8 w-full" />
    </div>
  );
}

export default SearchHeader;
