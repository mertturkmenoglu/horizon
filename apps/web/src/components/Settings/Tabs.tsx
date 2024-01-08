import { NavItem } from './NavItem';
import { tabs } from './mapTabs';

export function Tabs(): React.ReactElement {
  return (
    <nav className="w-full">
      <ul className="flex w-full flex-col space-y-2">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            {...tab}
          />
        ))}
      </ul>
    </nav>
  );
}
