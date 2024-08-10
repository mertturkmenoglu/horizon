import Button from '@/components/Button';
import { cn } from '@/lib/cn';
import { getCurrencySymbolOrDefault } from '@/lib/currency';
import { getUserImage } from '@/lib/img';
import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useTimespan } from '../hooks/useTimespan';

type Props = TProps & {
  service: GetServiceByIdResponse;
};

function UserCard({ service, className }: Props): React.ReactElement {
  const { isFavorite, mutation: favMutation } = useFavorites(service);
  const timespan = useTimespan(service.priceTimespan);

  return (
    <div
      className={cn(
        'flex h-min flex-col items-center space-y-4 bg-neutral-400/10 p-4',
        className
      )}
    >
      <Link
        to={`/user/${service.user.username}`}
        className="flex flex-col items-center"
      >
        <img
          src={getUserImage(service.user.profileImage)}
          alt=""
          className="size-24 rounded-lg"
        />
        <div className="mt-4 text-2xl font-medium">{service.user.name}</div>
        <div className="text-midnight/70">@{service.user.username}</div>
      </Link>

      <Button
        appearance="midnight"
        className="flex items-center justify-center gap-2"
      >
        <AtSymbolIcon className="size-6" />
        <span>Get in contact</span>
      </Button>

      <div className="mt-4 text-lg font-bold">
        {service.price} {getCurrencySymbolOrDefault(service.priceUnit)} /{' '}
        {timespan}
      </div>

      <FavoriteButton
        onClick={() => favMutation.mutate()}
        isFavorite={isFavorite}
      />
    </div>
  );
}

export default UserCard;
