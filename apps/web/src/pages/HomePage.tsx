import FeaturesCarousel from '@/components/FeaturesCarousel';
import QuickActions from '@/components/QuickActions';
import RecommendationGrid, {
  TRecommendation,
} from '@/components/RecommendationGrid';
import ReferToFriend from '@/components/ReferToFriend';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';

const cards: TRecommendation[] = [
  {
    url: '#',
    image:
      'https://images.unsplash.com/photo-1698434156107-17486c312c50?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Italian teacher',
    username: 'notahu',
    price: '75$',
    rating: {
      score: 4.8,
      reviews: 427,
    },
    isNew: false,
    isPro: true,
    topRated: true,
  },
  {
    url: '#',
    image:
      'https://images.unsplash.com/photo-1594732832278-abd644401426?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Web Design',
    username: 'johndoe',
    price: '50$',
    rating: {
      score: 4.3,
      reviews: 10,
    },
    isNew: true,
    isPro: false,
    topRated: false,
  },
  {
    url: '#',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Biology work group',
    username: 'metubio',
    price: '5$',
    rating: {
      score: 2.9,
      reviews: 5,
    },
    isNew: false,
    isPro: false,
    topRated: false,
  },
  {
    url: '#',
    image:
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Car Repair',
    username: 'tamirciciragi',
    price: '150$',
    rating: {
      score: 3.7,
      reviews: 280,
    },
    isNew: false,
    isPro: true,
    topRated: false,
  },
  {
    url: '#',
    image:
      'https://images.unsplash.com/photo-1616587896595-51352538155b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Wedding Planner',
    username: 'betul',
    price: '120$',
    rating: {
      score: 4.9,
      reviews: 1622,
    },
    isNew: false,
    isPro: false,
    topRated: true,
  },
];

function HomePage(): React.ReactElement {
  const { user } = useAuth();
  return (
    <MainLayout>
      <ReferToFriend className="mt-0" />
      <h2 className="mt-8 text-4xl font-bold">Hey {user?.name},</h2>
      <div className="mt-2 text-lg font-bold">How can we help you?</div>

      <QuickActions className="mt-8" />

      <RecommendationGrid
        className="mt-16"
        title={{
          text: 'New Services',
          href: '/',
        }}
        items={cards}
      />

      <RecommendationGrid
        className="mt-8"
        title={{
          text: 'Popular Right Now',
          href: '/',
        }}
        items={[...cards].reverse()}
      />

      <FeaturesCarousel className="mt-8" />

      <div className="my-32"></div>
    </MainLayout>
  );
}

export default HomePage;
