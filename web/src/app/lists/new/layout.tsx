import BackLink from '@/components/blocks/back-link';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div>
      <div className="flex flex-col justify-start">
        <BackLink href="/lists" />
        <h2 className="text-2xl font-semibold tracking-tight">Create a List</h2>
      </div>
      <hr className="my-2" />
      <div className="my-8">{children}</div>
    </div>
  );
}
