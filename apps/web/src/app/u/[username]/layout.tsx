type Props = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function Layout({ children, params: { username } }: Props): React.ReactElement {
  return (
    <div className="container">
      <div>Bio: {username}</div>

      <hr className="mx-auto my-4 hidden max-w-4xl md:block" />

      <div>tabs navigation</div>

      <div>{children}</div>
    </div>
  );
}

export default Layout;
