import CollapsibleText from '@/components/blocks/collapsible-text';
import UserImage from '@/components/blocks/user-image';
import { Separator } from '@/components/ui/separator';
import api from '@/lib/api';
import { getAuthCookie } from '@/lib/auth';
import { getCategoryTitle } from '@/lib/categories';
import { HServiceMetadataDto, HServiceResponseDto } from '@/lib/dto';
import Link from 'next/link';
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

type Res = {
  data: HServiceResponseDto;
  metadata: HServiceMetadataDto;
};

async function getServiceById(id: string): Promise<Res> {
  const res = await api
    .get(`hservices/${id}`, {
      headers: {
        ...getAuthCookie(),
      },
    })
    .json<Res>();
  return res;
}

export default async function Page({ params: { id } }: Props) {
  const { data, metadata } = await getServiceById(id);
  const categoryTitle = getCategoryTitle(data.category);

  return (
    <div className="container mx-auto mt-8 md:mt-16">
      <Breadcrumb
        categoryId={data.category}
        categoryTitle={categoryTitle}
        serviceTitle={data.title}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-32">
        <Carousel media={data.media.data} />

        <div>
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-2 scroll-m-20 text-4xl font-extrabold capitalize tracking-tight">
              {data.title}
            </h2>

            <div className="flex items-center">
              <FavoriteButton
                isFavorite={metadata.isFavorite}
                hserviceId={id}
              />

              <BookmarkButton
                isBookmarked={metadata.isBookmarked}
                hserviceId={id}
              />

              <Menu hserviceId={id} />
            </div>
          </div>

          <p className="mt-2 text-sm text-primary">{categoryTitle}</p>
          <Link
            href={`/u/${data.user.username}`}
            className="mt-4 flex items-center gap-2"
          >
            <UserImage src={data.user.profileImage} />
            <div>{data.user.fullName}</div>
          </Link>

          <CollapsibleText text={data.description} />
          <h2 className="mt-8 text-lg font-bold">Information</h2>
          <InformationTable hservice={data} />
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
