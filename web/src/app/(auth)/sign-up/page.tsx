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

const minFullNameLength = 3;

const FormSchema = z.object({
  fullName: z
    .string()
    .min(minFullNameLength, { message: 'At least 3 characters' })
    .max(128, { message: 'Value is too long' }),
  username: z
    .string()
    .min(4, { message: 'At least 4 characters' })
    .max(32, { message: 'Value is too long' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormInput = z.infer<typeof FormSchema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const { formState, register, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await api.post('auth/credentials/register', {
      json: data,
    });

    if (res.status === status.Created) {
      window.location.href = '/sign-in';
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
      <h2 className="mt-4 text-xl font-bold">Create Your Horizon Account</h2>
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
        <Label htmlFor="full-name">Full Name</Label>
        <Input
          type="text"
          id="full-name"
          placeholder="Your name"
          autoComplete="name"
          {...register('fullName')}
        />
        <InputError error={formState.errors.fullName} />
        <div className="my-4"></div>

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

        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          autoComplete="username"
          {...register('username')}
        />
        <InputError error={formState.errors.email} />
        <div className="my-4"></div>

        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            autoComplete="new-password"
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
          <div className="my-4"></div>
        </div>

        <Button
          variant="default"
          className="w-full"
          type="submit"
        >
          Sign Up
        </Button>

        <Separator className="my-4" />

        <GoogleAuth text="Sign up with Google" />
      </form>
    </Card>
  );
}
