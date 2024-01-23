import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import MainLayout from '@/layouts/MainLayout';
import { getCurrencySymbolOrDefault } from '@/lib/currency';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { getUserImage } from '@/lib/img';
import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from './hooks/useBreadcrumb';
import { useFavorites } from './hooks/useFavorites';
import FavoriteButton from './components/FavoriteButton';
import Description from './components/Description';
import Lightbox from './components/Lightbox';

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
          <h2 className="text-4xl font-bold">{service.title}</h2>
          <Description description={service.description} />
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

          <Lightbox service={service} />
        </div>

        <div className="flex h-min flex-col items-center space-y-4 bg-neutral-400/10 p-4">
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
            {timespanToText[service.priceTimespan]}
          </div>

          <FavoriteButton
            onClick={() => favMutation.mutate()}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default ServiceDetailPage;
