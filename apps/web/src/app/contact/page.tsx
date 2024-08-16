'use client';

import Logo from '@/app/icon.png';
import BackLink from '@/components/blocks/back-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Required' })
    .max(100, { message: 'Too long' }),
  email: z
    .string()
    .email()
    .min(1, { message: 'Required' })
    .max(100, { message: 'Too long' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Required' })
    .max(32, { message: 'Too long' }),
  subject: z
    .string()
    .min(1, { message: 'Required' })
    .max(100, { message: 'Too long' }),
  message: z
    .string()
    .min(1, { message: 'Required' })
    .max(3000, { message: 'Too long' }),
});

export type FormInput = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const e = encodeURIComponent;
    const mailToAddress = 'gethorizonapp@gmail.com';
    const mailBody = `Name: ${e(data.fullName)} \nEmail: ${e(
      data.email
    )} \nPhone: ${e(data.phoneNumber)} \nMessage: ${e(data.message)}`;
    const redirect = `mailto:${e(mailToAddress)}?subject=${e(
      data.subject
    )}&body=${e(mailBody)}`;
    window.location.href = redirect;
  };

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <BackLink href="/" />

      <div className="mt-8 flex w-full flex-col items-center">
        <Image
          src={Logo}
          alt="Horizon"
          className="size-12 min-h-12 min-w-12"
        />
        <h2 className="mt-4 scroll-m-20 text-3xl font-medium tracking-tight lg:text-4xl">
          Horizon
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">Contact Us</p>
      </div>

      <form
        className={cn('mt-8 grid grid-cols-2 gap-4')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="full-name">Full Name</Label>
          <Input
            type="text"
            id="full-name"
            placeholder="Your full name"
            autoComplete="name"
            {...register('fullName')}
          />
          <InputError error={errors.fullName} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            {...register('email')}
          />
          <InputError error={errors.email} />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="Your phone number"
            autoComplete="tel"
            {...register('phoneNumber')}
          />
          <InputError error={errors.phoneNumber} />
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            placeholder="Subject"
            autoComplete="off"
            {...register('subject')}
          />
          <InputError error={errors.subject} />
        </div>

        <div className="col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Your message"
            autoComplete="off"
            {...register('message')}
          />
          <InputError error={errors.message} />
        </div>

        <div className="col-span-2 grid grid-cols-3">
          <Button
            type="submit"
            className="col-span-1 col-start-2"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
