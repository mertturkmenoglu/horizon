/* eslint-disable jsx-a11y/alt-text */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { items } from './items';

const slogan = 'We got you covered.';

type Props = {
  className?: string;
};

export default function FeaturesCarousel({ className }: Readonly<Props>) {
  return (
    <Carousel className={cn('w-full rounded-md', className)}>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.image}>
            <div className="rounded-md p-1">
              <div>
                <div className="relative flex items-center justify-center rounded-md bg-black/90">
                  <img
                    src={item.image}
                    className={cn(
                      'aspect-[3] h-full rounded-md object-cover opacity-70'
                    )}
                    role="presentation"
                    alt=""
                  />
                  <div className="absolute bottom-2 left-2 rounded-md px-8 py-4 md:bottom-8 md:left-16">
                    <div className="text-sm font-bold text-white md:text-base">
                      {item.text}
                    </div>
                    <div className="text-xl font-bold text-white md:text-3xl">
                      {slogan}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
