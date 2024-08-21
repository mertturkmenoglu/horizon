import { items } from './items';
import Link from './link';

export default function Sidebar() {
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {items.map((el) => (
        <Link
          text={el.text}
          href={el.href}
          key={el.href}
        />
      ))}
    </nav>
  );
}
