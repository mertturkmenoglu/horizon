import { cn } from '@/lib/cn';
import Item from './Item';

type Props = TProps & {};

const items = [
  {
    id: 'abc',
    user: {
      id: 'c',
      name: 'Ceren 1',
      username: 'ceren',
      profileImage: null,
    },
    lastMessage: {
      content: 'Wait a bit, know that face',
      date: '2024-01-21T05:21:34.146Z',
    },
  },
  {
    id: 'abcd',
    user: {
      id: 'ce',
      name: 'Ceren 2',
      username: 'ceren2',
      profileImage: null,
    },
    lastMessage: {
      content: 'Sound of silence',
      date: '2024-01-21T02:21:34.146Z',
    },
  },
  {
    id: 'abce',
    user: {
      id: 'cer',
      name: 'Ceren 3',
      username: 'ceren3',
      profileImage: null,
    },
    lastMessage: {
      content: 'Touch the sound of silence',
      date: '2024-01-20T05:21:34.146Z',
    },
  },
  {
    id: 'abcf',
    user: {
      id: 'cere',
      name: 'Ceren 4',
      username: 'ceren4',
      profileImage: null,
    },
    lastMessage: {
      content: 'Ten thousand people maybe more',
      date: '2023-01-21T05:21:34.146Z',
    },
  },
];

function Convsersations({ className }: Props): React.ReactElement {
  return (
    <div className={cn('', className)}>
      <h2 className="text-xl font-bold">Messages</h2>
      {items.map((k) => (
        <Item
          key={k.id}
          id={k.id}
          lastMessage={k.lastMessage}
          user={k.user}
        />
      ))}
    </div>
  );
}

export default Convsersations;
