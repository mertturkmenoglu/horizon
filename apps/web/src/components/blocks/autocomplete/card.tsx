import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  image: string;
  categoryName: string;
};

export default function Card({ name, image, id, categoryName }: Props) {
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
        </div>
      </Link>
    </div>
  );
}
