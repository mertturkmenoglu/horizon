'use client';

import { Input } from '@/components/ui/input';
import InputInfo from '@/components/ui/input-info';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Your full name is required' })
    .max(128, { message: 'Value is too long' }),
  gender: z
    .string()
    .min(1, { message: 'Your gender is required' })
    .max(32)
    .optional(),
});

const genderOptions = ['Male', 'Female', 'Other'] as const;

type FormInput = z.infer<typeof schema>;

type Props = {
  fullName: string;
  gender: string | null;
};

export default function Form({ fullName, gender }: Props) {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: fullName,
      gender: gender ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log('inside on submit');
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md"
    >
      <div className="">
        <Label htmlFor="full-name">Full Name</Label>
        <Input
          type="text"
          id="full-name"
          autoComplete="name"
          {...form.register('fullName')}
        />
        <InputInfo text="Your full name" />
        <div className="my-4"></div>

        <Label htmlFor="gender">Gender</Label>
        <Select
          value={form.getValues('gender')}
          onValueChange={(v) => {
            form.setValue('gender', v);
            form.trigger('gender');
          }}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
