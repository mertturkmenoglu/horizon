import Button from '@/components/Button';
import Input from '@/components/Input';
import MainLayout from '@/layouts/MainLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(512),
  category: z.string().min(1),
  pricing: z.string().min(1),
  isOnline: z.boolean(),
  location: z.string().optional(),
  availability: z.string(),
  photos: z.array(z.string()),
  other: z.string().max(256),
});

type NewServiceFormInput = z.infer<typeof schema>;

function NewServicePage(): React.ReactElement {
  const { register, formState, handleSubmit } = useForm<NewServiceFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<NewServiceFormInput> = async (values) => {
    console.log({ values });
  };

  return (
    <MainLayout>
      <form
        className="mt-8 max-w-5xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-midnight">New Service</h2>

        <Input
          label="Title"
          type="text"
          className="mt-8 placeholder:text-midnight"
          inputClassName="border-b rounded-none border-midnight focus:border-none placeholder:text-midnight/50"
          placeholder="Title of your service"
          error={formState.errors.title}
          {...register('title')}
        />

        <Button className="mt-8 w-32">Create</Button>
      </form>
    </MainLayout>
  );
}

export default NewServicePage;
