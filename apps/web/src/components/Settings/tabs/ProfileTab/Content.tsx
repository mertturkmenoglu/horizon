import { GetMeResponse } from '@/lib/dto';
import { SubmitHandler } from 'react-hook-form';
import { ProfileFormInput, useProfileForm } from './useProfileForm';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import ProfileImageForm from './ProfileImageForm';
import Select from 'react-select';
import countryCodes from 'country-codes-list';
import InputMask from 'react-input-mask';
import { useMemo, useState } from 'react';

type Props = {
  user: GetMeResponse;
};

function Content({ user }: Props): React.ReactElement {
  const { register, formState, handleSubmit } = useProfileForm(user);
  const [callCode, setCallCode] = useState('');
  const onSubmit: SubmitHandler<ProfileFormInput> = (values) => {
    console.log(values, callCode);
  };

  const options = useMemo(() => {
    return countryCodes
      .all()
      .map(({ countryCallingCode, countryCode, flag }) => {
        return {
          value: countryCallingCode,
          label: flag + ' ' + countryCode + ' +' + countryCallingCode,
        };
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Profile Settings</h2>
      <hr className="w-full h-[2px] bg-black" />

      <ProfileImageForm className="max-w-lg mt-4" />

      <h2 className="text-2xl font-semibold mt-8">About You</h2>
      <hr className="w-full h-[2px] bg-black" />

      <form
        className="max-w-lg mt-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Your Name"
          placeholder="Your name"
          error={formState.errors.name}
          {...register('name')}
        />

        <Input
          label="Gender"
          placeholder="Your gender"
          error={formState.errors.gender}
          className="mt-4"
          hint="Some users may prefer to see your gender depending on the provided service. You are free to use your own words or to leave it empty."
          {...register('gender')}
        />

        <h3 className="text-base font-semibold mt-8">Contact Information</h3>
        <div className="text-xs text-neutral-500 font-medium">
          The information you provide here will be visible to all users.
        </div>

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
    </div>
  );
}

export default Content;
