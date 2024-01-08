import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { getUserImage } from '@/lib/img';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

function ProfileImageForm({ className }: TProps): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const { user, refetch } = useAuth();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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
      onSubmit={async (e) => {
        e.preventDefault();

        if (!file) {
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
          await api('/users/profile/image', {
            method: 'PUT',
            body: formData,
          });

          toast.success(t('update-ok'));

          if (refetch) {
            await refetch();
          }
        } catch (error) {
          toast.error(t('update-err'));
        }
      }}
    >
      <img
        src={getUserImage(user.profileImage)}
        className="size-24 min-h-12 min-w-12 rounded-lg"
      />

      <div className="flex flex-col space-y-2">
        <Input
          label=""
          type="file"
          name="file"
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
