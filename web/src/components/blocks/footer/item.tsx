import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

export default function Item({ href, text }: Readonly<Props>) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-neutral-600 hover:underline"
      >
        {text}
      </Link>
    </li>
  );
}
