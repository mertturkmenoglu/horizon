import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import ServiceSearch from '@/components/ServiceSearch';
import Spinner from '@/components/Spinner';
import MainLayout from '@/layouts/MainLayout';

function HomePage(): React.ReactElement {
  return (
    <MainLayout>
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

      <div>Overview</div>

      <div>My Services</div>

      <div>Saved Services</div>

      <div>Personalized Suggestions</div>

      <a href="/services/categories">Explore all categories</a>

      <Spinner className="size-16 mt-8" />
    </MainLayout>
  );
}

export default HomePage;
