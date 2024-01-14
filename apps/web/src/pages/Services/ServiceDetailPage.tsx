import Breadcrumb, { TBreadcrumbItem } from '@/components/Breadcrumb';
import Spinner from '@/components/Spinner';
import { useCategoryData } from '@/hooks/useCategoryData';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { getCurrencySymbolOrDefault } from '@/lib/currency';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { getUserImage } from '@/lib/img';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

function Container(): React.ReactElement {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await api<{ data: GetServiceByIdResponse }>(
        '/services/' + id
      );
      return res.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (query.isLoading) {
    return (
      <MainLayout>
        <div className="my-64 flex items-center justify-center">
          <Spinner className="size-12" />
        </div>
      </MainLayout>
    );
  }

  if (query.isError) {
    return (
      <MainLayout>
        <div>An error happened</div>
      </MainLayout>
    );
  }

  if (!query.data) {
    return <></>;
  }

  return <ServiceDetailPage service={query.data} />;
}

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
  const categoryData = useCategoryData();
  const flattenCategories = categoryData.data
    .map((c) => [c, c.subcategories].flat())
    .flat();

  const category =
    flattenCategories.find((c) => c.id === service.category) ?? null;

  const breadcrumbItems: TBreadcrumbItem[] = [
    {
      href: `/categories/${encodeURIComponent(
        category?.title ?? ''
      )}?id=${category?.id}`,
      text: category?.title ?? '',
      capitalize: true,
    },
    {
      href: '#',
      text: service.title.toLocaleLowerCase() ?? '',
      capitalize: true,
    },
  ];

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
        </div>

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
      </div>

      <pre className="mt-32 text-wrap">{JSON.stringify(service, null, 2)}</pre>
    </MainLayout>
  );
}

export default Container;
