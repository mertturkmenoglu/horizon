import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import { cn } from '@/lib/cn';

const items = [
  {
    text: 'Looking for a yoga instructor?',
    image:
      'https://images.unsplash.com/photo-1683130461764-af2bea342b45?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: 'Need help planning your next trip?',
    image:
      'https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: 'Cannot figure out how to publish your website?',
    image:
      'https://images.unsplash.com/photo-1577909659949-2302826adf26?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: 'Need help with accounting?',
    image:
      'https://images.unsplash.com/photo-1663524789638-a576264a7f53?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function FeaturesCarousel({ className }: TProps): React.ReactElement {
  return (
    <Carousel className={cn('w-full rounded-md', className)}>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.image}>
            <div className="p-1 rounded-md">
              <div>
                <div className="flex items-center justify-center relative bg-black/90 rounded-md">
                  <img
                    src={item.image}
                    className={cn(
                      'h-full object-cover aspect-[3] rounded-md opacity-70'
                    )}
                  />
                  <div className="absolute left-2 bottom-2 md:left-16 md:bottom-8 py-4 px-8 rounded-md">
                    <div className="text-white font-bold text-sm md:text-base">
                      {item.text}
                    </div>
                    <div className="text-white font-bold text-xl md:text-3xl">
                      We got you covered.
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

export default FeaturesCarousel;
