import { cn } from '@/lib/cn';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from 'react-select';
import Button from '../Button';
import { NewServiceFormInput, useNewServiceForm } from './useForm';
import { useOptions } from './useOptions';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { SubmitHandler } from 'react-hook-form';

function NewServiceForm({ className }: TProps): React.ReactElement {
  const form = useNewServiceForm();
  const ops = useOptions();
  const { errors } = form.formState;

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
    <form
      className={cn(className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h2 className="text-4xl font-medium text-midnight">
        Create a new service
      </h2>
      <Input
        label="Title"
        type="text"
        className="mt-8"
        placeholder="Title of your service"
        error={errors.title}
        {...form.register('title')}
      />
      <TextArea
        label="Description"
        className="mt-8"
        placeholder="Description of your service"
        rows={6}
        error={errors.description}
        {...form.register('description')}
      />
      <label
        htmlFor="category-select"
        className="mt-8 block text-sm font-semibold text-midnight"
      >
        Category
      </label>
      <Select
        options={ops.category}
        className=""
        id="category-select"
        aria-label={'Select a category'}
        onChange={(newValue): void => {
          form.setValue('category', newValue?.value ?? 0);
          form.trigger('category');
        }}
      />
      <Input
        label="Price"
        type="text"
        className="mt-8"
        placeholder="Enter an amount"
        error={errors.price}
        {...form.register('price')}
      />
      <label
        htmlFor="price-unit-select"
        className="mt-8 block text-sm font-semibold text-midnight"
      >
        Currency
      </label>
      <Select
        options={ops.price}
        className=""
        id="price-unit-select"
        aria-label={'Select a currency'}
        onChange={(newValue): void => {
          form.setValue('priceUnit', newValue?.value ?? 'USD');
          form.trigger('priceUnit');
        }}
      />
      <label
        htmlFor="price-timespan-select"
        className="mt-8 block text-sm font-semibold text-midnight"
      >
        Timespan
      </label>
      <Select
        options={ops.timespan}
        className=""
        id="price-timespan-select"
        aria-label={'Select a timespan'}
        onChange={(newValue): void => {
          form.setValue('priceTimespan', newValue?.value ?? 0);
          form.trigger('priceTimespan');
        }}
      />
      <div className="mt-8 flex space-x-2">
        <input
          type="checkbox"
          placeholder="IsOnline"
          {...form.register('isOnline')}
        />

        <div>This service is online</div>
      </div>
      <TextArea
        label="Location"
        className="mt-8"
        placeholder="Location of the service, or a URL if it's online"
        rows={2}
        error={errors.location}
        {...form.register('location')}
      />
      <Input
        label="Delivery Time"
        type="number"
        className="mt-8"
        placeholder="Enter a duration"
        value={form.getValues('deliveryTime')}
        error={errors.deliveryTime}
        onChange={(e) => {
          form.setValue('deliveryTime', e.target.valueAsNumber);
          form.trigger('deliveryTime');
        }}
      />

      <label
        htmlFor="delivery-timespan-select"
        className="mt-8 block text-sm font-semibold text-midnight"
      >
        Delivery Timespan
      </label>
      <Select
        options={ops.timespan}
        className=""
        id="delivery-timespan-select"
        aria-label={'Select a timespan'}
        onChange={(newValue): void => {
          form.setValue('deliveryTimespan', newValue?.value ?? 0);
          form.trigger('deliveryTimespan');
        }}
      />

      <Button
        className="mt-8 w-min"
        appearance="trans"
      >
        Create
      </Button>
    </form>
  );
}

export default NewServiceForm;
