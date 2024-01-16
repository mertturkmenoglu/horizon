import Button from '@/components/Button';
import Input from '@/components/Input';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { ContactInformationFormInput } from './useContactForm';
import { useState } from 'react';

type Props = TProps & {
  form: UseFormReturn<ContactInformationFormInput>;
};

function ContactLinks({
  className,
  form: { getValues, setValue, trigger, setError, clearErrors, formState },
}: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkValue, setNewLinkValue] = useState('');

  return (
    <div className={className}>
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
  );
}

export default ContactLinks;
