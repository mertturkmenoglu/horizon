import Tooltip from '@/components/Tooltip';
import { BellIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Actions(): React.ReactElement {
  const { t } = useTranslation('appbar');

  const actions = [
    {
      icon: PlusIcon,
      label: t('create-service'),
      to: '/services/new',
    },
    {
      icon: BellIcon,
      label: t('notifications'),
      to: '/notifications',
    },
    {
      icon: EnvelopeIcon,
      label: t('messages'),
      to: '/messages',
    },
  ];

  return (
    <>
      {actions.map((action) => (
        <Tooltip
          key={action.to}
          content={action.label}
        >
          <Link
            to={action.to}
            className="rounded-full hover:bg-neutral-400/20"
          >
            <action.icon className="size-10 p-2" />
            <span className="sr-only">{action.label}</span>
          </Link>
        </Tooltip>
      ))}
    </>
  );
}

export default Actions;
