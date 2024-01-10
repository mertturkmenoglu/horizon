import Button from '@/components/Button';
import Input from '@/components/Input';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { GetMeResponse } from '@/lib/dto';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import TextArea from '@/components/TextArea';
import Select from 'react-select';
import {
  getDefaultValue,
  getPhoneWithoutCallingCode,
  phoneOptions,
} from './utils';
import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import { useTranslation } from 'react-i18next';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ContactInformationFormInput, useContactForm } from './useContactForm';

type Props = TProps & {
  user: GetMeResponse;
};

function ContactInformationForm({
  className,
  user,
}: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,
  } = useContactForm(user);

  const [callCode, setCallCode] = useState(
    getDefaultValue(user.contactInformation.phone)?.value ?? ''
  );

  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkValue, setNewLinkValue] = useState('');

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
          <Select
            options={phoneOptions}
            className="w-36 lining-nums"
            aria-label={t('phone-country-code')}
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

      <div className="mt-4">
        <div className="text-sm font-semibold text-midnight">{t('links')}</div>
        <div className="mt-2">
          {getValues('links').map((link, i) => (
            <div
              className="flex items-center space-x-4"
              key={link.name + i}
            >
              <Button
                appearance="red"
                className="h-min w-min p-1"
                type="button"
                onClick={() => {
                  const prev = getValues('links');
                  prev.splice(i, 1);
                  setValue('links', [...prev]);
                  trigger('links');
                }}
              >
                <XMarkIcon className="size-3 text-white" />
                <span className="sr-only">
                  {t('remove-link')} {link.name}
                </span>
              </Button>
              <div className="grid w-full grid-cols-3 text-wrap">
                <div className="col-span-1 text-sm font-semibold text-midnight">
                  {t('link-name')}
                </div>
                <div className="col-span-2 text-sm font-semibold text-midnight">
                  {t('link-value')}
                </div>
                <div>{link.name}</div>
                <div className="text-wrap">{link.value}</div>
              </div>
            </div>
          ))}
          {getValues('links').length === 0 && <div>{t('no-link')}</div>}
        </div>
        <div className="mt-4 flex items-end space-x-2">
          <Input
            label={t('link-name')}
            className="flex-1"
            value={newLinkName}
            onChange={(e) => setNewLinkName(e.target.value)}
          />
          <Input
            label={t('link-value')}
            className="flex-1"
            value={newLinkValue}
            onChange={(e) => setNewLinkValue(e.target.value)}
          />

          <Button
            appearance="sky"
            className="h-min w-min p-3"
            type="button"
            onClick={() => {
              if (newLinkName === '' || newLinkValue === '') {
                setError('links', {
                  message: t('update-fail'),
                });
                return;
              }

              const res = z.string().url().safeParse(newLinkValue);

              if (!res.success) {
                setError('links', {
                  message: t('update-fail'),
                });
                return;
              }

              const prev = getValues('links');
              setValue('links', [
                ...prev,
                { name: newLinkName, value: newLinkValue },
              ]);
              setNewLinkName('');
              setNewLinkValue('');
              clearErrors('links');
            }}
          >
            <PlusIcon className="size-4 text-white" />
            <span className="sr-only">{t('add-link')}</span>
          </Button>
        </div>
        <div className="mt-2">
          {formState.errors.links !== undefined && (
            <div className="text-sm font-medium text-red-500">
              {t('update-fail')}
            </div>
          )}
        </div>
      </div>

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
