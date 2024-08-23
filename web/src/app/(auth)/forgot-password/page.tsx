'use client';

import Logo from '@/app/icon.png';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import InputInfo from '@/components/ui/input-info';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthLink from '../_components/auth-link';

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
});

type FormInput = z.infer<typeof FormSchema>;

export default function Page() {
  const router = useRouter();

  const { formState, register, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await api.post('auth/forgot-password/send', {
      json: {
        email: data.email,
      },
    });

    if (res.status == 200 || res.status == 204) {
      window.sessionStorage.setItem('forgot-password-email', data.email);
      router.push('/forgot-password/reset');
    }
  };

  return (
    <Card className="container mx-auto my-32 flex max-w-md flex-col py-8">
      <Image
        src={Logo}
        alt="Horizon"
        className="size-12 min-h-12 min-w-12"
      />
      <h2 className="mt-4 text-xl font-bold">Forgot Password</h2>
      <div className="text-sm opacity-70">
        Already have an account?{' '}
        <AuthLink
          href="/sign-in"
          text="Sign In"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 w-full"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          {...register('email')}
        />
        <InputInfo text="We will send a code to your email address" />
        <InputError error={formState.errors.email} />
        <div className="my-4"></div>

        <Button
          variant="default"
          className="w-full"
          type="submit"
        >
          Send Code
        </Button>
      </form>
    </Card>
  );
}
