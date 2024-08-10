import Breadcrumb from '@/components/Breadcrumb';
import MainLayout from '@/layouts/MainLayout';
import { getCurrencySymbolOrDefault } from '@/lib/currency';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useBreadcrumb } from './hooks/useBreadcrumb';
import Description from './components/Description';
import Lightbox from './components/Lightbox';
import { useTimespan } from './hooks/useTimespan';
import UserCard from './components/UserCard';

type Props = {
  service: GetServiceByIdResponse;
};

function ServiceDetailPage({ service }: Props): React.ReactElement {
  const breadcrumbItems = useBreadcrumb(service);
  const priceTimespan = useTimespan(service.priceTimespan);
  const deliveryTimespan = useTimespan(service.deliveryTimespan);

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
              {getCurrencySymbolOrDefault(service.priceUnit)} / {priceTimespan}
            </div>
            <div>Location: {service.location}</div>
            <div className="mt-4 text-lg font-bold">
              Delivery:
              {service.deliveryTime}
              {deliveryTimespan}
            </div>
            <div>
              Rating: {service.totalPoints} / {service.totalVotes}
            </div>
            <div>{service.isNew && <div>New Service</div>}</div>
            <div>{service.isPopular && <div>Popular</div>}</div>
          </div>
        </div>

        <UserCard service={service} />
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Lightbox service={service} />
      </div>
    </MainLayout>
  );
}

export default ServiceDetailPage;
