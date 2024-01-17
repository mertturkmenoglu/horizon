import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { cn } from '@/lib/cn';
import { GetMeResponse } from '@/lib/dto';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ContactInformationFormInput, useContactForm } from './useContactForm';
import { getDefaultValue } from './utils';
import PhoneInput from './PhoneInput';
import ContactLinks from './ContactLinks';

type Props = TProps & {
  user: GetMeResponse;
};

function ContactInformationForm({
  className,
  user,
}: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const { form, mutation } = useContactForm(user);
  const { formState, register, handleSubmit } = form;
  const [callCode, setCallCode] = useState(
    getDefaultValue(user.contactInformation.phone)?.value ?? ''
  );

  const onSubmit: SubmitHandler<ContactInformationFormInput> = async (
    values
  ) => {
    mutation.mutate({
      ...values,
      callCode,
    });
  };

  const onInvalid: SubmitErrorHandler<ContactInformationFormInput> = () => {
    toast.error(t('update-fail'));
  };

  return (
    <form
      className={cn('mt-4 flex max-w-lg flex-col', className)}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <Input
        label={t('contact-email')}
        placeholder={t('contact-email')}
        error={formState.errors.email}
        className="mt-4"
        {...register('email')}
      />

      <div className="w-full">
        <label
          htmlFor="phone"
          className="mt-4 block text-sm font-semibold text-midnight"
        >
          {t('phone')}
        </label>

        <div className="mt-1 flex flex-nowrap space-x-2">
          <PhoneInput
            defaultPhone={user.contactInformation.phone}
            form={form}
            setCallCode={setCallCode}
          />
        </div>
      </div>

      <TextArea
        label={t('address')}
        placeholder={t('address')}
        error={formState.errors.address}
        className="mt-4"
        {...register('address')}
      />

      <TextArea
        label={t('other')}
        placeholder={t('other-placeholder')}
        hint={t('other-hint')}
        error={formState.errors.address}
        className="mt-4"
        {...register('other')}
      />

      <ContactLinks
        form={form}
        className="mt-4"
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

export default ContactInformationForm;
