import Button from '@/components/Button';
import Input from '@/components/Input';
import { api, isApiError } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';
import Info from './Info';

type Props = {
  user: GetMeResponse;
};

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(64),
  confirmPassword: z.string().min(8).max(64),
});

type ChangePasswordFormInput = z.infer<typeof schema>;

function Content({ user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'account' });
  const { register, formState, handleSubmit, reset } =
    useForm<ChangePasswordFormInput>({
      resolver: zodResolver(schema),
    });

  const mutation = useMutation({
    mutationKey: ['settings-account'],
    mutationFn: async (values: ChangePasswordFormInput) => {
      await api('/auth/password/change', {
        method: 'PUT',
        body: values,
      });
    },
    onSuccess: () => {
      toast.success(t('password-change-success'));
      reset();
    },
    onError: (err) => {
      if (isApiError(err)) {
        toast.error(err.data.message);
      }
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormInput> = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error(t('password-dont-match'));
      return;
    }

    mutation.mutate(values);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <Info user={user} />

      <h2 className="mt-8 text-2xl font-semibold">
        {t('change-password-title')}
      </h2>
      <hr className="h-[2px] w-full bg-black" />

      <form
        className="mt-4 flex max-w-lg flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="mt-4"
          label={t('current-password')}
          type="password"
          placeholder={t('current-password')}
          autoComplete="current-password"
          error={formState.errors.currentPassword}
          {...register('currentPassword')}
        />

        <Input
          className="mt-4"
          label={t('new-password')}
          type="password"
          placeholder={t('new-password')}
          autoComplete="new-password"
          error={formState.errors.newPassword}
          {...register('newPassword')}
        />

        <Input
          className="mt-4"
          label={t('confirm-password')}
          type="password"
          placeholder={t('confirm-password')}
          autoComplete="new-password"
          error={formState.errors.confirmPassword}
          {...register('confirmPassword')}
        />

        <Button
          appearance="sky"
          className="mt-4 max-w-64 self-end"
          type="submit"
        >
          {t('change-password-button')}
        </Button>
      </form>
    </div>
  );
}

export default Content;
