import Button from '@/components/Button';
import Input from '@/components/Input';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import TextArea from '@/components/TextArea';
import Select from 'react-select';
import countryCodes from 'country-codes-list';
import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import { useTranslation } from 'react-i18next';

const schema = z.object({
  email: z.string().email().or(z.string().max(0)),
  phone: z.string().length(10).or(z.string().max(0)),
  address: z.string().max(128).optional(),
  other: z.string().max(256).optional(),
});

type ContactInformationFormInput = z.infer<typeof schema>;

type Props = TProps & {
  user: GetMeResponse;
};

const options = countryCodes
  .all()
  .map(({ countryCallingCode, countryCode, flag }) => {
    return {
      value: countryCallingCode,
      label: flag + ' ' + countryCode + ' +' + countryCallingCode,
    };
  });

function getPhoneWithoutCallingCode(phone: string): string {
  if (phone === '') {
    return '';
  }

  if (phone.length > 10) {
    return phone.substring(phone.length - 10);
  }

  return phone;
}

function getDefaultValue(phone: string) {
  for (const option of options) {
    if (phone.startsWith('+' + option.value)) {
      return option;
    }
  }

  return undefined;
}

function ContactInformationForm({
  className,
  user,
}: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const { register, formState, handleSubmit, setValue } =
    useForm<ContactInformationFormInput>({
      resolver: zodResolver(schema),
      defaultValues: {
        address: user.contactInformation.address,
        email: user.contactInformation.email,
        other: user.contactInformation.other,
        phone: getPhoneWithoutCallingCode(user.contactInformation.phone),
      },
    });

  const [callCode, setCallCode] = useState(
    getDefaultValue(user.contactInformation.phone)?.value ?? ''
  );

  const onSubmit: SubmitHandler<ContactInformationFormInput> = async (
    values
  ) => {
    try {
      await api('/users/profile/contact', {
        method: 'PATCH',
        body: {
          ...values,
          phone: '+' + callCode + values.phone,
        },
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
          <Select
            options={options}
            className="w-36 lining-nums"
            defaultValue={getDefaultValue(user.contactInformation.phone)}
            onChange={(newValue) => {
              setCallCode(newValue?.value ?? '');
            }}
          />

          <MaskedInput
            mask={[
              '(',
              /[1-9]/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            className="flex-1"
            placeholder={t('phone-placeholder')}
            guide={false}
            {...register('phone')}
            onChange={(e) => {
              const v = e.target.value;
              const deniedChars = ['(', ')', ' ', '-'];
              const filtered = v
                .split('')
                .filter((x) => !deniedChars.includes(x))
                .join('');
              setValue('phone', filtered);
            }}
            defaultValue={getPhoneWithoutCallingCode(
              user.contactInformation.phone
            )}
            render={(ref, props) => (
              <Input
                label=""
                className="flex-1"
                ref={ref as unknown as React.Ref<HTMLInputElement>}
                error={formState.errors.phone}
                {...props}
              />
            )}
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
