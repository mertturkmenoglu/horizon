import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { cn } from '@/lib/cn';
import { GetMeResponse } from '@/lib/dto';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ProfileFormInput, useProfileForm } from './useProfileForm';

type Props = TProps & {
  user: GetMeResponse;
};

function ProfileForm({ className, user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const { form, mutation } = useProfileForm(user);

  const onSubmit: SubmitHandler<ProfileFormInput> = async (values) => {
    mutation.mutate(values);
  };

  return (
    <form
      className={cn('mt-4 flex max-w-lg flex-col', className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Input
        label={t('name')}
        placeholder={t('name')}
        error={form.formState.errors.name}
        {...form.register('name')}
      />

      <TextArea
        label={t('about-you')}
        placeholder={t('about-you-placeholder')}
        hint={t('about-you-hint')}
        error={form.formState.errors.description}
        className="mt-4"
        {...form.register('description')}
      />

      <Input
        label={t('gender')}
        placeholder={t('gender-placeholder')}
        error={form.formState.errors.gender}
        className="mt-4"
        hint={t('gender-hint')}
        {...form.register('gender')}
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
