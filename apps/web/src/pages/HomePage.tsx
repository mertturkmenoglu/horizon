import Appbar from '@/components/Appbar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import ServiceSearch from '@/components/ServiceSearch';

function HomePage(): React.ReactElement {
  return (
    <div className="max-w-7xl mx-auto">
      <Appbar className="mt-4" />

      <ServiceSearch className="mt-16" />

      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/5"
            >
              <div className="p-1">
                <div>
                  <div className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default HomePage;
