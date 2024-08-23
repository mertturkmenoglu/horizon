import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GetMyListsResponseDtoItem } from '@/lib/dto';
import { cn } from '@/lib/utils';

type Props = {
  list: GetMyListsResponseDtoItem;
};

export default function ListCard({ list }: Props) {
  return (
    <Card
      key={list.id}
      className={cn('p-4', 'flex flex-col gap-4 lg:flex-row')}
    >
      <CardHeader className="">
        <CardTitle className="line-clamp-1 text-lg capitalize">
          {list.title}
        </CardTitle>
        <CardDescription className="line-clamp-1">
          Created At: {new Date(list.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
