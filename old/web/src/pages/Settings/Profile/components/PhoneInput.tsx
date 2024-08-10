import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import {
  getDefaultValue,
  getPhoneWithoutCallingCode,
  phoneMask,
  phoneOptions,
} from './utils';
import Input from '@/components/Input';
import MaskedInput from 'react-text-mask';
import { UseFormReturn } from 'react-hook-form';
import { ContactInformationFormInput } from './useContactForm';

type Props = TProps & {
  defaultPhone: string;
  form: UseFormReturn<ContactInformationFormInput>;
  setCallCode: React.Dispatch<React.SetStateAction<string>>;
};

function PhoneInput({
  defaultPhone,
  form,
  setCallCode,
}: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const deniedChars = ['(', ')', ' ', '-'];
    const filtered = v
      .split('')
      .filter((x) => !deniedChars.includes(x))
      .join('');
    form.setValue('phone', filtered);
  };

  return (
    <>
      <Select
        options={phoneOptions}
        className="w-36 lining-nums"
        aria-label={t('phone-country-code')}
        defaultValue={getDefaultValue(defaultPhone)}
        onChange={(newValue) => {
          setCallCode(newValue?.value ?? '');
        }}
      />

      <MaskedInput
        mask={phoneMask}
        className="flex-1"
        placeholder={t('phone-placeholder')}
        guide={false}
        {...form.register('phone')}
        onChange={onChange}
        defaultValue={getPhoneWithoutCallingCode(defaultPhone)}
        render={(ref, props) => (
          <Input
            label=""
            className="flex-1"
            ref={ref as unknown as React.Ref<HTMLInputElement>}
            error={form.formState.errors.phone}
            {...props}
          />
        )}
      />
    </>
  );
}

export default PhoneInput;
