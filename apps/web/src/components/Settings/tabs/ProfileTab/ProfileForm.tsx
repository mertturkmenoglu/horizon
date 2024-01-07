import Button from '@/components/Button';
import Input from '@/components/Input';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(48),
  gender: z.string().max(32).optional(),
});

type ProfileFormInput = z.infer<typeof schema>;

type Props = TProps & {
  user: GetMeResponse;
};

function ProfileForm({ className, user }: Props): React.ReactElement {
  const { register, formState, handleSubmit } = useForm<ProfileFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      gender: user.gender,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormInput> = async (values) => {
    try {
      await api('/users/profile', {
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

export default ProfileForm;
