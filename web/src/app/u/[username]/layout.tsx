type Props = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export default function Layout({ children }: Props): React.ReactElement {
  return <div>{children}</div>;
}
