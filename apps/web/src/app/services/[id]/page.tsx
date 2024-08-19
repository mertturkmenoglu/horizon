import CollapsibleText from '@/components/blocks/collapsible-text';
import { Separator } from '@/components/ui/separator';
import api from '@/lib/api';
import { getAuthCookie } from '@/lib/auth';
import { getCategoryTitle } from '@/lib/categories';
import { HServiceResponseDto } from '@/lib/dto';
import BookmarkButton from './_components/bookmark-button';
import Breadcrumb from './_components/breadcrumb';
import Carousel from './_components/carousel';
import FavoriteButton from './_components/favorite-button';
import InformationTable from './_components/information-table';
import Menu from './_components/menu';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: {
    id: string;
  };
};

async function getServiceById(id: string): Promise<HServiceResponseDto> {
  const res = await api
    .get(`hservices/${id}`, {
      headers: {
        ...getAuthCookie(),
      },
    })
    .json<{ data: HServiceResponseDto }>();
  return res.data;
}

export default async function Page({ params: { id } }: Props) {
  const hservice = await getServiceById(id);
  const categoryTitle = getCategoryTitle(hservice.category);

  return (
    <div className="container mx-auto mt-8 md:mt-16">
      <Breadcrumb
        categoryId={hservice.category}
        categoryTitle={categoryTitle}
        serviceTitle={hservice.title}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-32">
        <Carousel media={hservice.media.data} />

        <div>
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-2 scroll-m-20 text-4xl font-extrabold capitalize tracking-tight">
              {hservice.title}
            </h2>

            <div className="flex items-center">
              <FavoriteButton
                isFavorite={false}
                hserviceId={id}
              />

              <BookmarkButton
                isBookmarked={false}
                hserviceId={id}
              />

              <Menu hserviceId={id} />
            </div>
          </div>

          <p className="mt-2 text-sm text-primary">{categoryTitle}</p>
          <CollapsibleText text={hservice.description} />
          <h2 className="mt-8 text-lg font-bold">Information</h2>
          <InformationTable hservice={hservice} />
        </div>
      </div>

      {/* <LocationMap location={location} /> */}

      <Separator className="my-8" />

      {/* <Reviews
        locationId={location.id}
        name={location.name}
      /> */}
    </div>
  );
}
