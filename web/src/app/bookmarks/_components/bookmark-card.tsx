import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCategoryTitle } from '@/lib/categories';
import { BookmarksResponseItemDto } from '@/lib/dto';

type Props = {
  bookmark: BookmarksResponseItemDto;
};

export default function BookmarkCard({ bookmark: { hservice } }: Props) {
  return (
    <Card className="group flex min-h-60 flex-col md:flex-row">
      <img
        src={hservice.media.data.slice(0, 1)[0].url}
        alt={hservice.media.data.slice(0, 1)[0].alt}
        className="aspect-video w-full rounded-t-md object-cover md:w-32 md:rounded-none md:rounded-l-md lg:w-32 2xl:w-64"
      />

      <div>
        <CardHeader>
          <CardTitle className="line-clamp-1 capitalize">
            {hservice.title}
          </CardTitle>
          <CardDescription className="line-clamp-1 text-primary">
            {getCategoryTitle(hservice.category)}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div
            className="visible line-clamp-4 text-sm leading-none"
            style={{
              wordWrap: 'break-word',
            }}
          >
            {hservice.description}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
