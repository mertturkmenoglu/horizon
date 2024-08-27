'use client';

import Logo from '@/app/icon.png';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import api, { status } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthLink from '../_components/auth-link';
import GoogleAuth from '../_components/google-auth';

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormInput = z.infer<typeof FormSchema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const { formState, register, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await api.post('auth/credentials/login', {
      json: data,
    });

    if (res.status === status.OK) {
      window.location.href = '/';
    }
  };

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Card className="container mx-auto my-32 flex max-w-md flex-col py-8">
      <Image
        src={Logo}
        alt="Horizon"
        className="size-12 min-h-12 min-w-12"
      />
      <h2 className="mt-4 text-xl font-bold">Sign in to Horizon</h2>
      <div className="text-sm opacity-70">
        Don&apos;t have an account?{' '}
        <AuthLink
          href="/sign-up"
          text="Sign Up"
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
        <InputError error={formState.errors.email} />
        <div className="my-4"></div>

        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            className="pr-10"
            {...register('password')}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={toggleShowPassword}
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
            error={formState.errors.password}
            className="self-start"
          />
          <AuthLink
            href="/forgot-password"
            text="Forgot password?"
            className="ml-auto"
          />
        </div>

        <div className="my-4"></div>

        <Button
          variant="default"
          className="w-full"
          type="submit"
        >
          Sign In
        </Button>

        <Separator className="my-4" />

        <GoogleAuth text="Sign in with Google" />
      </form>
    </Card>
  );
}
