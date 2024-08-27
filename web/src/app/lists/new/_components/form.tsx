'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import InputInfo from '@/components/ui/input-info';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const minTitleLength = 5;
const redirectTimeout = 3000;

const schema = z.object({
  title: z
    .string()
    .min(minTitleLength, { message: 'Minimum 5 characters' })
    .max(128, { message: 'Maximum 128 characters' }),
});

type FormInput = z.infer<typeof schema>;

export default function NewListForm() {
  const qc = useQueryClient();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationKey: ['new-list'],
    mutationFn: async (data: FormInput) => {
      await api.post('lists/', {
        json: data,
      });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['lists'],
      });
      toast.success('Created new list. Redirecting...');
      setTimeout(() => {
        window.location.href = '/lists';
      }, redirectTimeout);
    },
    onError: () => {
      toast.error('Failed to create list');
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl"
    >
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        placeholder="Title"
        autoComplete="off"
        {...form.register('title')}
      />
      <InputError error={form.formState.errors.title} />
      <InputInfo text="Give your list a meaningful name." />
      <div className="my-4"></div>

      <Button type="submit">Create</Button>
    </form>
  );
}
