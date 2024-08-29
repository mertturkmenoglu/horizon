'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { GetListByIdResponseDto } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
  list: GetListByIdResponseDto;
};

const minTitleLength = 5;

const schema = z.object({
  title: z
    .string()
    .min(minTitleLength, { message: 'At least 5 characters' })
    .max(128, { message: 'Value is too long' }),
});

type FormInput = z.infer<typeof schema>;

export default function Form({ list }: Readonly<Props>) {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: list.title,
    },
  });

  const mutation = useMutation({
    mutationKey: ['update-list', list.id],
    mutationFn: async (data: FormInput) => {
      await api.patch(`lists/${list.id}`, {
        json: data,
      });
    },
    onSuccess: () => {
      window.location.href = `/lists/${list.id}`;
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="my-8 max-w-3xl"
    >
      {/* Title */}
      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title of your list"
          autoComplete="off"
          {...form.register('title')}
        />
        <InputError error={form.formState.errors.title} />
      </div>

      <div className="my-4">
        <Button>Update</Button>
      </div>
    </form>
  );
}
