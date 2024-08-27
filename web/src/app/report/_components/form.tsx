'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import InputInfo from '@/components/ui/input-info';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ReportInput } from '../page';
import { reasons } from './data';
import { FormInput } from './schema';
import { useCreateReport } from './use-create-report';
import { useReportForm } from './use-report-form';

type Props = ReportInput;

export default function ReportForm(props: Readonly<Props>) {
  const form = useReportForm(props);
  const mutation = useCreateReport();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutation.mutate(data);
  };

  const onReasonChange = useCallback(
    (v: string) => {
      form.setValue('reason', v);
    },
    [form]
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto my-4 flex max-w-3xl flex-col space-y-8"
    >
      <div className="">
        <Label htmlFor="target-id">ID</Label>
        <Input
          type="text"
          id="target-id"
          disabled={true}
          autoComplete="off"
          {...form.register('targetId')}
        />
        <InputInfo text="We filled this value for you." />
      </div>

      <div className="">
        <Label htmlFor="target-type">Resource Type</Label>
        <Input
          type="text"
          id="target-type"
          disabled={true}
          autoComplete="off"
          {...form.register('targetType')}
        />
        <InputInfo text="We filled this value for you." />
      </div>

      <div className="">
        <Label htmlFor="reason">Reason</Label>
        <Select
          value={form.getValues('reason')}
          onValueChange={onReasonChange}
        >
          <SelectTrigger id="reason">
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            {reasons.map((reason) => (
              <SelectItem
                key={reason.id}
                value={reason.name}
              >
                {reason.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <InputError error={form.formState.errors.reason} />
      </div>

      <div className="">
        <Label htmlFor="comment">Your Comment</Label>
        <Textarea
          id="comment"
          rows={2}
          placeholder="Give us more information about the report"
          autoComplete="off"
          {...form.register('comment')}
        />
        <InputInfo text="Optional" />
        <InputError error={form.formState.errors.comment} />
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          asChild
          variant="link"
          className="px-0"
        >
          <Link href="/help">Need help? Check our help center.</Link>
        </Button>

        <Button
          type="submit"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
          className="ml-auto"
        >
          <span>Report</span>
        </Button>
      </div>
    </form>
  );
}
