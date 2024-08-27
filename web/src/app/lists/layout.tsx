import { PropsWithChildren } from 'react';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <div className="container my-16">{children}</div>;
}
