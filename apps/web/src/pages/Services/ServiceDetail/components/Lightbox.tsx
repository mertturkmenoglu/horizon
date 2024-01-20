import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useState } from 'react';
import Yarl from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import { cn } from '@/lib/cn';

type Props = {
  service: GetServiceByIdResponse;
};

function Lightbox({ service }: Props): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Carousel className={cn('max-w-md rounded-md')}>
        <CarouselContent>
          {service.photos.map((item) => (
            <CarouselItem key={item.id}>
              <button
                className="rounded-md p-1"
                onClick={() => setOpen(true)}
              >
                <div>
                  <div className="relative flex items-center justify-center rounded-md bg-black/90">
                    <img
                      src={item.url}
                      className={cn(
                        'aspect-[3/2] h-full rounded-md object-cover opacity-70'
                      )}
                      role="presentation"
                    />
                  </div>
                </div>
              </button>
            </CarouselItem>
          ))}
          {service.videos.map((item) => (
            <CarouselItem key={item.id}>
              <button
                className="rounded-md p-1"
                onClick={() => setOpen(true)}
              >
                <div>
                  <div className="relative flex items-center justify-center rounded-md bg-black/90">
                    <video controls>
                      <source
                        src={item.url}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Yarl
        open={open}
        controller={{
          closeOnBackdropClick: true,
        }}
        plugins={[Video]}
        close={() => setOpen(false)}
        slides={[
          ...service.photos.map((p) => ({
            src: p.url,
            alt: p.alt,
          })),
          ...service.videos.map((v) => ({
            type: 'video' as const,
            sources: [
              {
                src: v.url,
                type: 'video/mp4',
              },
            ],
          })),
        ]}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      />
    </>
  );
}

export default Lightbox;
