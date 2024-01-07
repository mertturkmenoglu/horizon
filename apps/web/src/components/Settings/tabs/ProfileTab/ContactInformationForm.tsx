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
import InputMask from 'react-input-mask';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email().or(z.string().max(0)),
  phone: z.string().max(15).optional(),
  address: z.string().max(64).optional(),
  other: z.string().max(64).optional(),
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

function ContactInformationForm({
  className,
  user,
}: Props): React.ReactElement {
  const { register, formState, handleSubmit } =
    useForm<ContactInformationFormInput>({
      resolver: zodResolver(schema),
      defaultValues: {
        address: user.contactInformation.address,
        email: user.contactInformation.email,
        other: user.contactInformation.other,
        phone: user.contactInformation.phone,
      },
    });

  const [callCode, setCallCode] = useState('');

  const onSubmit: SubmitHandler<ContactInformationFormInput> = async (
    values
  ) => {
    try {
      await api('/users/profile/contact', {
        method: 'PATCH',
        body: values,
      });

      toast.success('Updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      className={cn('max-w-lg mt-4 flex flex-col', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Contact Email"
        placeholder="Contact email"
        error={formState.errors.email}
        className="mt-4"
        {...register('email')}
      />

      <div className="w-full">
        <label
          htmlFor="phone"
          className="mt-4 block text-sm font-semibold text-midnight"
        >
          Phone Number
        </label>

        <div className="flex flex-nowrap space-x-2 mt-1">
          <Select
            options={options}
            className="w-36 lining-nums"
            onChange={(newValue) => {
              setCallCode(newValue?.value ?? '');
            }}
          />

          <InputMask
            mask="(999) 999 9999"
            {...register('phone')}
          >
            <Input
              label=""
              className="flex-1"
            />
          </InputMask>
        </div>
      </div>

      <div>{callCode}</div>

      <TextArea
        label="Address"
        placeholder="Address"
        error={formState.errors.address}
        className="mt-4"
        {...register('address')}
      />

      <TextArea
        label="Other"
        placeholder="Other information you may want your client's to know."
        hint="You can provide any additional information here."
        error={formState.errors.address}
        className="mt-4"
        {...register('other')}
      />

      <Button
        appearance="sky"
        className="mt-4 max-w-32 self-end"
        type="submit"
      >
        Update
      </Button>
    </form>
  );
}

export default ContactInformationForm;
