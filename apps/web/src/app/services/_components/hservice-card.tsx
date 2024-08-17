import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCategoryTitle } from '@/lib/categories';
import { HServiceResponseDto } from '@/lib/dto';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  hservice: HServiceResponseDto;
};

export default function HServiceCard({ className, hservice }: Props) {
  const firstImage = hservice.media.data[0];

  return (
    <Card className={cn('group flex min-h-60 flex-col md:flex-row', className)}>
      <img
        src={firstImage?.url ?? ''}
        alt={firstImage?.alt ?? ''}
        className="aspect-video w-full rounded-t-md object-cover md:w-32 md:rounded-none md:rounded-l-md lg:w-32 2xl:w-64"
      />

      <div>
        <CardHeader>
          <CardTitle className="line-clamp-1 capitalize">
            {hservice.title}
          </CardTitle>
          <CardDescription className="line-clamp-1">
            Category: {getCategoryTitle(hservice.category)}
          </CardDescription>
        </CardHeader>

        <div className="block p-6">
          <div
            className="visible line-clamp-4 text-sm leading-none"
            style={{
              wordWrap: 'break-word',
            }}
          >
            {hservice.description}
          </div>
        </div>
      </div>
    </Card>
  );
}
