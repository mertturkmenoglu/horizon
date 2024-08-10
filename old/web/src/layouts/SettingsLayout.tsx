interface SettingsLayoutProps {
  tabs: React.ReactNode;
  children: React.ReactNode;
}

function SettingsLayout({
  tabs,
  children,
}: SettingsLayoutProps): React.ReactElement {
  return (
    <div className="mt-8 grid grid-cols-12">
      <div className="col-span-12 lg:col-span-2">{tabs}</div>
      <div className="col-span-12 mt-8 px-4 lg:col-span-10 lg:mt-0">
        {children}
      </div>
    </div>
  );
}

export default SettingsLayout;
