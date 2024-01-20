import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import MainLayout from '@/layouts/MainLayout';
import { getCurrencySymbolOrDefault } from '@/lib/currency';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { getUserImage } from '@/lib/img';
import {
  AtSymbolIcon,
  BookmarkIcon as FavEmpty,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as FavFilled } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from './hooks/useBreadcrumb';
import { useFavorites } from './hooks/useFavorites';

type Props = {
  service: GetServiceByIdResponse;
};

const timespanToText: Record<number, string> = {
  0: 'Hour',
  1: 'Day',
  2: 'Week',
  3: 'Month',
};

function ServiceDetailPage({ service }: Props): React.ReactElement {
  const breadcrumbItems = useBreadcrumb(service);
  const { isFavorite, mutation: favMutation } = useFavorites(service);

  return (
    <MainLayout>
      <Breadcrumb
        items={breadcrumbItems}
        className="mt-8"
      />

      <div className="mt-8 flex justify-between">
        <div>
          <h2 className="text-3xl font-bold">{service.title}</h2>
          <pre className="mt-8 max-w-4xl text-wrap break-normal font-sans text-lg">
            {service.description.replace(/\t/g, '\n')}
          </pre>
          <div>
            <div>Online: {service.isOnline ? 'Yes' : 'No'}</div>
            <div className="mt-4 text-lg font-bold">
              Price:
              {service.price}
              {getCurrencySymbolOrDefault(service.priceUnit)} /{' '}
              {timespanToText[service.priceTimespan]}
            </div>
            <div>Location: {service.location}</div>
            <div className="mt-4 text-lg font-bold">
              Delivery:
              {service.deliveryTime}
              {timespanToText[service.deliveryTimespan]}
            </div>
            <div>
              Rating: {service.totalPoints} / {service.totalVotes}
            </div>
            <div>{service.isNew && <div>New Service</div>}</div>
            <div>{service.isPopular && <div>Popular</div>}</div>
          </div>

          <div className="space-y-4">
            {service.photos.map((p) => (
              <div key={p.id}>
                <img
                  src={p.url}
                  alt={p.alt}
                  className="aspect-video w-48"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {service.videos.map((v) => (
              <div key={v.id}>
                <video
                  width="320"
                  height="240"
                  controls
                >
                  <source
                    src={v.url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-4">
          <Link
            to={`/user/${service.user.username}`}
            className="flex flex-col items-end"
          >
            <img
              src={getUserImage(service.user.profileImage)}
              alt=""
              className="size-24 rounded-lg"
            />
            <div className="mt-4 text-2xl font-medium">{service.user.name}</div>
            <div className="text-midnight/70">@{service.user.username}</div>
            <div className="mt-4 text-lg font-bold">
              {service.price} {getCurrencySymbolOrDefault(service.priceUnit)} /{' '}
              {timespanToText[service.priceTimespan]}
            </div>
          </Link>

          <Button
            appearance="midnight"
            className="flex items-center justify-center gap-2"
          >
            <AtSymbolIcon className="size-6" />
            <span>Get in contact</span>
          </Button>

          <button
            onClick={() => {
              favMutation.mutate();
            }}
          >
            {isFavorite ? (
              <div className="flex items-center gap-2">
                <FavFilled className="size-8 fill-sky-500" />
                <span className="">Remove from favorites</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FavEmpty className="size-8" />
                <span>Add to favorites</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default ServiceDetailPage;
