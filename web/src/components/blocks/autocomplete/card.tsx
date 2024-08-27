import Link from 'next/link';
import UserImage from '../user-image';

type Props = {
  id: string;
  name: string;
  image: string;
  categoryName: string;
  user: {
    id: string;
    fullName: string;
    username: string;
    profileImage: string | null;
  };
};

export default function Card({
  name,
  image,
  id,
  categoryName,
  user,
}: Readonly<Props>) {
  return (
    <div className="p-4 hover:bg-muted">
      <Link
        href={`/services/${id}`}
        className="flex gap-8"
      >
        <img
          src={image}
          alt=""
          className="aspect-video w-48 rounded-lg object-cover"
        />

        <div>
          <div className="line-clamp-1 text-lg font-semibold capitalize leading-none tracking-tight">
            {name}
          </div>

          <div className="mt-2 text-sm font-semibold leading-none tracking-tight text-primary">
            {categoryName}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <UserImage src={user.profileImage} />
            <span className="font-semibold">{user.fullName}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
