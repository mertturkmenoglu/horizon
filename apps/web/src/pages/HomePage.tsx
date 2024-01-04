import FeaturesCarousel from '@/components/FeaturesCarousel';
import QuickActions from '@/components/QuickActions';
import ReferToFriend from '@/components/ReferToFriend';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';

const cards = [
  {
    image:
      'https://images.unsplash.com/photo-1698434156107-17486c312c50?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Italian teacher',
    username: 'notahu',
    price: '75$',
  },
  {
    image:
      'https://images.unsplash.com/photo-1594732832278-abd644401426?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Web Design',
    username: 'johndoe',
    price: '50$',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Biology work group',
    username: 'metubio',
    price: '5$',
  },
  {
    image:
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Car Repair',
    username: 'tamirciciragi',
    price: '150$',
  },
  {
    image:
      'https://images.unsplash.com/photo-1616587896595-51352538155b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Wedding Planner',
    username: 'betul',
    price: '120$',
  },
];

function Section(): React.ReactElement {
  return (
    <div className="">
      <div className="flex mt-16 space-x-4 items-baseline">
        <div className="text-midnight text-2xl">New Services</div>
        <a
          href="/"
          className=" font-bold underline text-midnight flex items-center space-x-2"
        >
          <div>See all</div>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 mt-4 items-center">
        {cards.map((card) => (
          <a
            href="/"
            key={card.image}
            className="first-of-type:ml-0 ml-2 hover:bg-neutral-400/20 rounded-md block"
          >
            <img
              src={card.image}
              alt=""
              className="h-40 aspect-video object-cover rounded-t-md"
            />
            <div className="bg-neutral-400/10 pt-2 px-1 rounded-b-md pb-4">
              <div className="text-lg font-semibold text-midnight">
                {card.title}
              </div>
              <div className="text-neutral-500">@{card.username}</div>
              <div className="lining-nums mt-4">{card.price} / hr</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function HomePage(): React.ReactElement {
  const { user } = useAuth();
  return (
    <MainLayout>
      <ReferToFriend className="mt-0" />
      <h2 className="mt-8 text-4xl font-bold">Hey {user?.name},</h2>
      <div className="mt-2 text-lg font-bold">How can we help you?</div>

      <QuickActions className="mt-8" />

      <Section />
      <Section />

      <FeaturesCarousel />

      <div className="my-32"></div>
    </MainLayout>
  );
}

export default HomePage;
