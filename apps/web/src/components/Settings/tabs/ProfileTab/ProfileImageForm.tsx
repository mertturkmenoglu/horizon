import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import { getUserImage } from '@/lib/img';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProfileImageMutation } from './useProfileImageMutation';

function ProfileImageForm({ className }: TProps): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const mutation = useProfileImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    mutation.mutate(file);
  };

  if (!user) {
    return <></>;
  }

  return (
    <form
      className={cn(
        'flex flex-wrap items-center justify-between gap-4',
        className
      )}
      onSubmit={onSubmit}
    >
      <img
        src={getUserImage(user.profileImage)}
        className="size-24 min-h-12 min-w-12 rounded-lg"
        role="presentation"
      />

      <div className="flex flex-col space-y-2">
        <Input
          label={t('profile-image-upload')}
          type="file"
          name="file"
          labelClassName="sr-only"
          accept=".png,.jpg,.jpeg"
          className="bg-transparent"
          onChange={handleFileChange}
        />
        <Button
          disabled={file === null}
          appearance="sky"
          className="w-fit self-end px-4"
        >
          {t('upload')}
        </Button>
      </div>
    </form>
  );
}

export default ProfileImageForm;
