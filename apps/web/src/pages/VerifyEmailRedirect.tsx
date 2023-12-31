import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

function VerifyEmailRedirect(): React.ReactElement {
  const { user } = useAuth();
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [res, setRes] = useState<boolean | null>(null);

  useEffect(() => {
    const fn = async () => {
      try {
        await api('/auth/email/verify', {
          method: 'POST',
          body: {
            email,
            code,
          },
        });
        return true;
      } catch (err) {
        return false;
      }
    };

    if (!code || email === null) {
      return;
    }

    fn().then((r) => setRes(r));
  }, [code, email, setRes]);

  if (user && user.emailVerified) {
    return <Navigate to="/home" />;
  }

  if (code === undefined || email === null) {
    return <Navigate to="/not-found" />;
  }

  if (res === true) {
    return <Navigate to="/home" />;
  }

  return <></>;
}

export default VerifyEmailRedirect;
