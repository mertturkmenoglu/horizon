'use client';

import { Input } from '@/components/ui/input';
import InputInfo from '@/components/ui/input-info';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
});

type FormInput = z.infer<typeof schema>;

type Props = {
  id: string;
  username: string;
  email: string;
};

export default function Form({ id, username, email }: Props) {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      id,
      username,
      email,
    },
    disabled: true,
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        console.log(data);
      })}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="id">ID</Label>
          <Input
            type="text"
            id="id"
            disabled={true}
            {...form.register('id')}
          />
          <InputInfo text="You cannot change your ID." />
          <div className="my-4"></div>

          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            disabled={true}
            {...form.register('username')}
          />
          <InputInfo text="You cannot change your username." />
          <div className="my-4"></div>

          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            disabled={true}
            {...form.register('email')}
          />
          <InputInfo text="You cannot change your email." />
        </div>
      </div>
    </form>
  );
}
