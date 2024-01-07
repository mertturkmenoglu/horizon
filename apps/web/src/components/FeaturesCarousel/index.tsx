import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

type TItem = {
  text: Record<string, string>;
  image: string;
};

const items: TItem[] = [
  {
    text: {
      en: 'Looking for a yoga instructor?',
      tr: 'Yoga eğitmeni mi arıyorsunuz?',
    },
    image:
      'https://images.unsplash.com/photo-1683130461764-af2bea342b45?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: {
      en: 'Need help planning your next trip?',
      tr: 'Gezinizi planlamak için yardıma mı ihtiyacınız var?',
    },
    image:
      'https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: {
      en: 'Cannot figure out how to publish your website?',
      tr: 'Web sitenizi nasıl yayınlayacağınızı bilmiyor musunuz?',
    },
    image:
      'https://images.unsplash.com/photo-1577909659949-2302826adf26?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: {
      en: 'Need help with accounting?',
      tr: 'Muhasebe konusunda yardım mı lazım?',
    },
    image:
      'https://images.unsplash.com/photo-1663524789638-a576264a7f53?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const slogan: Record<string, string> = {
  en: 'We got you covered.',
  tr: 'Biz yanınızdayız.',
};

function FeaturesCarousel({ className }: TProps): React.ReactElement {
  const { i18n } = useTranslation('common');

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
                      {item.text[i18n.language]}
                    </div>
                    <div className="text-white font-bold text-xl md:text-3xl">
                      {slogan[i18n.language]}
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
