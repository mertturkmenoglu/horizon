import { useAuth } from '@/hooks/useAuth';
import { GetUserByUsernameResponse } from '@/lib/dto';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function useUserInfo(user: GetUserByUsernameResponse) {
  const { user: authUser } = useAuth();
  const { t } = useTranslation('user');

  const image = useMemo(() => {
    return user.profileImage !== '' ? user.profileImage : '/user.jpg';
  }, [user.profileImage]);

  const description = useMemo(() => {
    return user.description !== '' ? user.description : t('no-description');
  }, [user.description, t]);

  const location = useMemo(() => {
    if (user.location.city === '' || user.location.city === '') {
      return '';
    }

    return `${user.location.city}, ${user.location.country}`;
  }, [user.location]);

  const isThisUser = useMemo(() => {
    return user.id === authUser?.id;
  }, [user, authUser]);

  return {
    image,
    description,
    location,
    isThisUser,
  };
}
