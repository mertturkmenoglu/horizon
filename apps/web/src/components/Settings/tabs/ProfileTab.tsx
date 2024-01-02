import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(48),
  gender: z.string().max(32).optional(),
  email: z.string().email().or(z.string().optional()),
  phone: z.string().max(15).optional(),
  address: z.string().max(64).optional(),
  other: z.string().max(64).optional(),
});

type ProfileFormInput = z.infer<typeof schema>;

function ProfileTabContainer(): React.ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return <ProfileTab user={user} />;
}

function ProfileTab({ user }: { user: GetMeResponse }): React.ReactElement {
  const { register, formState, handleSubmit } = useForm<ProfileFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      address: user?.contactInformation.address,
      email: user?.contactInformation.email,
      gender: user?.gender,
      other: user?.contactInformation.other,
      phone: user?.contactInformation.phone,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormInput> = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Profile Settings</h2>
      <hr className="w-full h-[2px] bg-black" />

      <form
        className="max-w-lg mt-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Your Name"
          bordered
          error={formState.errors.name}
          {...register('name')}
        />

        <Input
          label="Gender"
          bordered
          error={formState.errors.gender}
          className="mt-4"
          hint="Some users may prefer to see your gender depending on the provided service. You are free to use your own words or to leave it empty."
        />

        <h3 className="text-base font-semibold mt-8">Contact Information</h3>
        <div className="text-xs text-neutral-500 font-medium">
          The information you provide here will be visible to all users.
        </div>

        <Input
          label="Contact Email"
          bordered
          error={formState.errors.email}
          className="mt-4"
        />

        <Input
          label="Phone Number"
          bordered
          error={formState.errors.phone}
          className="mt-4"
        />

        <Input
          label="Address"
          bordered
          error={formState.errors.address}
          className="mt-4"
        />

        <Input
          label="Other"
          bordered
          error={formState.errors.other}
          className="mt-4"
          hint="You can provide additional information here"
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

export default ProfileTabContainer;
