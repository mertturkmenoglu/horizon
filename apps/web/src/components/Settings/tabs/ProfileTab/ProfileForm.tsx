import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(48),
  description: z.string().max(256).optional(),
  gender: z.string().max(32).optional(),
});

type ProfileFormInput = z.infer<typeof schema>;

type Props = TProps & {
  user: GetMeResponse;
};

function ProfileForm({ className, user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const { register, formState, handleSubmit } = useForm<ProfileFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      gender: user.gender,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormInput> = async (values) => {
    try {
      await api('/users/profile', {
        method: 'PATCH',
        body: values,
      });

      toast.success(t('update-ok'));
    } catch (error) {
      toast.error(t('update-err'));
    }
  };

  return (
    <form
      className={cn('mt-4 flex max-w-lg flex-col', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={t('name')}
        placeholder={t('name')}
        error={formState.errors.name}
        {...register('name')}
      />

      <TextArea
        label={t('about-you')}
        placeholder={t('about-you-placeholder')}
        hint={t('about-you-hint')}
        error={formState.errors.description}
        className="mt-4"
        {...register('description')}
      />

      <Input
        label={t('gender')}
        placeholder={t('gender-placeholder')}
        error={formState.errors.gender}
        className="mt-4"
        hint={t('gender-hint')}
        {...register('gender')}
      />

      <Button
        appearance="sky"
        className="mt-4 max-w-32 self-end"
        type="submit"
      >
        {t('update')}
      </Button>
    </form>
  );
}

export default ProfileForm;
