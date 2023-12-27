import Appbar from '@/components/Appbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  return (
    <main>
      <div className="max-w-7xl mx-auto">
        <Appbar className="mt-4" />
        <div>{children}</div>
      </div>
    </main>
  );
}

export default MainLayout;
