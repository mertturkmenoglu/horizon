interface SettingsLayoutProps {
  tabs: React.ReactNode;
  children: React.ReactNode;
}

function SettingsLayout({
  tabs,
  children,
}: SettingsLayoutProps): React.ReactElement {
  return (
    <div className="grid grid-cols-12 mt-8">
      <div className="col-span-12 lg:col-span-2">{tabs}</div>
      <div className="col-span-12 lg:col-span-10 mt-8 lg:mt-0 lg:border-l lg:border-l-midnight px-4">
        {children}
      </div>
    </div>
  );
}

export default SettingsLayout;
