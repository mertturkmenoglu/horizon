import Card from '@/components/blocks/autocomplete/card';
import { getCategoryTitle } from '@/lib/categories';
import { Media } from '@/lib/dto';

type Props = {
  hit: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: number;
    price: number;
    priceUnit: string;
    priceTimespan: string;
    isOnline: boolean;
    url: string;
    location: string;
    deliveryTime: number;
    deliveryTimespan: string;
    media: { data: Media[] };
    user: any; // TODO: Replace with the actual type
  };
};

export default function Hit({ hit }: Props) {
  return (
    <Card
      id={hit.id}
      name={hit.title}
      categoryName={getCategoryTitle(hit.category)}
      image={hit.media.data[0].url}
      user={hit.user}
    />
  );
}
