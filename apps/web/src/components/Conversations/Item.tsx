import { useRelativeTime } from '@/hooks/useRelativeTime';
import { cn } from '@/lib/cn';
import { getUserImage } from '@/lib/img';
import { NavLink, useParams } from 'react-router-dom';

type Props = TProps & {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  lastMessage: {
    content: string;
    date: string;
  };
};

function Item({ id, user, lastMessage }: Props): React.ReactElement {
  const { convId: paramConvId } = useParams();
  const f = new Intl.RelativeTimeFormat('tr', {
    style: 'long',
    numeric: 'auto',
  });
  const [v, unit] = useRelativeTime(new Date(lastMessage.date).getTime());

  return (
    <NavLink
      to={'/messages/' + id}
      className={() =>
        cn('inline-flex w-full space-x-2 rounded px-1 py-2', {
          'bg-midnight text-white': paramConvId === id,
          'hover:bg-neutral-400/20': paramConvId !== id,
        })
      }
    >
      <div className={cn()}>
        <img
          src={getUserImage(user.profileImage)}
          className="size-12 rounded-full"
          alt=""
        />
      </div>
      <div>
        <div className="flex items-center space-x-1">
          <div className="text-sm font-semibold">{user.name}</div>
          <div className="text-sm text-neutral-500">@{user.username}</div>
          <div>{f.format(v, unit)}</div>
        </div>
        <div>{lastMessage.content}</div>
      </div>
    </NavLink>
  );
}

export default Item;
