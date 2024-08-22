import { PropsWithChildren } from 'react';
import MessagesList from './_components/messages-list';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container my-16 grid h-[70vh] max-h-[70vh] min-h-[70vh] grid-cols-12 gap-2">
      <div className="col-span-4">
        <MessagesList />
      </div>
      <div className="col-span-8">{children}</div>
    </div>
  );
}
