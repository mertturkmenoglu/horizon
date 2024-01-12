import { cn } from '@/lib/cn';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { getServiceImage, getUserImage } from '@/lib/img';
import Rating from './Rating';
import Chips from './ChipsContainer';

export type Props = React.ComponentPropsWithoutRef<'a'> & {
  service: GetServiceByIdResponse;
};

function ServiceCard({
  className,
  service,
  ...props
}: Props): React.ReactElement {
  return (
    <a
      href={'/services/' + service.id}
      className={cn('group block rounded-md lining-nums', className)}
      {...props}
    >
      <img
        src={getServiceImage(service.photos)}
        alt=""
        className="aspect-video w-full rounded-t-md object-cover"
      />
      <div className="rounded-b-md pt-2">
        <div className="flex flex-col">
          <div className="flex w-full items-start justify-between">
            <div>
              <div className="line-clamp-1 text-sm font-semibold text-midnight group-hover:underline">
                {service.title}
              </div>
              <div className="text-sm text-neutral-500">
                @{service.user.username}
              </div>
            </div>

            <img
              src={getUserImage(service.user.profileImage)}
              alt=""
              className="size-8 min-h-8 min-w-8 rounded-full"
            />
          </div>
        </div>

        <div className="mt-2 flex h-12 items-center justify-between space-x-4">
          <Rating
            totalPoints={service.totalPoints}
            totalVotes={service.totalVotes}
          />
          <Chips service={service} />
        </div>
      </div>
    </a>
  );
}

export default ServiceCard;
