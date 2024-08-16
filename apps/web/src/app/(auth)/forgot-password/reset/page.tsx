'use client';

import Logo from '@/app/icon.png';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthLink from '../../_components/auth-link';

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
  code: z.string().length(6, { message: 'Invalid code' }),
  newPassword: z
    .string()
    .min(6, { message: 'Password should be longer than 6 characters' })
    .max(64, { message: 'Too long' }),
});

type FormInput = z.infer<typeof FormSchema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const { formState, register, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: window.sessionStorage.getItem('forgot-password-email') ?? '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    // const res = await api.post('auth/credentials/login', {
    //   json: data,
    // });

    // if (res.status == 200) {
    //   window.location.href = '/';
    // }
    console.log({ data });
  };

  return (
    <Card className="container mx-auto my-32 flex max-w-md flex-col py-8">
      <Image
        src={Logo}
        alt="Horizon"
        className="size-12 min-h-12 min-w-12"
      />
      <h2 className="mt-4 text-xl font-bold">Reset Password</h2>
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
          disabled={true}
          {...register('email')}
        />
        <InputError error={formState.errors.email} />
        <div className="my-4"></div>

        <Label htmlFor="code">Code</Label>
        <Input
          type="text"
          id="code"
          placeholder="Code"
          autoComplete="off"
          {...register('code')}
        />
        <InputError error={formState.errors.code} />
        <div className="my-4"></div>

        <Label htmlFor="new-password">New Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="New Password"
            autoComplete="new-password"
            className="pr-10"
            {...register('newPassword')}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
          >
            {showPassword ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center">
          <InputError
            error={formState.errors.newPassword}
            className="self-start"
          />
          <div className="my-4"></div>
        </div>

        <Button
          variant="default"
          className="w-full"
          type="submit"
        >
          Reset Your Password
        </Button>
      </form>
    </Card>
  );
}
