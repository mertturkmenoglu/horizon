import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { useCategoryData } from '@/hooks/useCategoryData';
import MainLayout from '@/layouts/MainLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Select from 'react-select';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const priceUnits = ['USD', 'TRY'] as const;

const timespans = ['Hour', 'Day', 'Week', 'Month'] as const;

const schema = z.object({
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(4096),
  category: z.number().min(1).max(45),
  price: z.string().min(1).max(10),
  priceUnit: z.enum(priceUnits),
  priceTimespan: z.number().min(0).max(3),
  isOnline: z.boolean(),
  location: z.string().min(1).max(128),
  deliveryTime: z.number().min(0).max(50),
  deliveryTimespan: z.number().min(0).max(3),
});

type NewServiceFormInput = z.infer<typeof schema>;

function NewServicePage(): React.ReactElement {
  const { register, formState, handleSubmit, setValue, trigger, getValues } =
    useForm<NewServiceFormInput>({
      resolver: zodResolver(schema),
    });

  const categories = useCategoryData();

  const subcategories = useMemo(() => {
    return categories.data.map((c) => c.subcategories).flat();
  }, [categories]);

  const catoptions = useMemo(() => {
    return subcategories.map((c) => ({
      value: c.id,
      label: c.title,
    }));
  }, [subcategories]);

  const priceUnitOptions = priceUnits.map((u) => ({
    value: u,
    label: u,
  }));

  const timespanOptions = timespans.map((t, i) => ({
    value: i,
    label: t,
  }));

  const onSubmit: SubmitHandler<NewServiceFormInput> = async (values) => {
    try {
      const res = await api<{ data: number }>('/services/', {
        method: 'POST',
        body: values,
      });

      toast.success('Created successfully. You will be redirected.');

      setTimeout(() => {
        window.location.href = '/services/' + res.data;
      }, 2000);
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  };

  return (
    <MainLayout>
      <form
        className="mx-auto mt-8 max-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl font-bold text-midnight">
          Create a new service
        </h2>
        <Input
          label="Title"
          type="text"
          className="mt-8"
          placeholder="Title of your service"
          error={formState.errors.title}
          {...register('title')}
        />
        <TextArea
          label="Description"
          className="mt-8"
          placeholder="Description of your service"
          rows={6}
          error={formState.errors.description}
          {...register('description')}
        />
        <label
          htmlFor="category-select"
          className="mt-8 block text-sm font-semibold text-midnight"
        >
          Category
        </label>
        <Select
          options={catoptions}
          className=""
          id="category-select"
          aria-label={'Select a category'}
          onChange={(newValue): void => {
            setValue('category', newValue?.value ?? 0);
            trigger('category');
          }}
        />
        <Input
          label="Price"
          type="text"
          className="mt-8"
          placeholder="Enter an amount"
          error={formState.errors.price}
          {...register('price')}
        />
        <label
          htmlFor="price-unit-select"
          className="mt-8 block text-sm font-semibold text-midnight"
        >
          Currency
        </label>
        <Select
          options={priceUnitOptions}
          className=""
          id="price-unit-select"
          aria-label={'Select a currency'}
          onChange={(newValue): void => {
            setValue('priceUnit', newValue?.value ?? 'USD');
            trigger('priceUnit');
          }}
        />
        <label
          htmlFor="price-timespan-select"
          className="mt-8 block text-sm font-semibold text-midnight"
        >
          Timespan
        </label>
        <Select
          options={timespanOptions}
          className=""
          id="price-timespan-select"
          aria-label={'Select a timespan'}
          onChange={(newValue): void => {
            setValue('priceTimespan', newValue?.value ?? 0);
            trigger('priceTimespan');
          }}
        />
        <div className="mt-8 flex space-x-2">
          <input
            type="checkbox"
            placeholder="IsOnline"
            {...register('isOnline')}
          />

          <div>This service is online</div>
        </div>
        <TextArea
          label="Location"
          className="mt-8"
          placeholder="Location of the service, or a URL if it's online"
          rows={2}
          error={formState.errors.location}
          {...register('location')}
        />
        <Input
          label="Delivery Time"
          type="number"
          className="mt-8"
          placeholder="Enter a duration"
          value={getValues('deliveryTime')}
          error={formState.errors.deliveryTime}
          onChange={(e) => {
            setValue('deliveryTime', e.target.valueAsNumber);
            trigger('deliveryTime');
          }}
        />

        <label
          htmlFor="delivery-timespan-select"
          className="mt-8 block text-sm font-semibold text-midnight"
        >
          Delivery Timespan
        </label>
        <Select
          options={timespanOptions}
          className=""
          id="delivery-timespan-select"
          aria-label={'Select a timespan'}
          onChange={(newValue): void => {
            setValue('deliveryTimespan', newValue?.value ?? 0);
            trigger('deliveryTimespan');
          }}
        />
        <Button className="mt-8 w-32">Create</Button>
      </form>
    </MainLayout>
  );
}

export default NewServicePage;
