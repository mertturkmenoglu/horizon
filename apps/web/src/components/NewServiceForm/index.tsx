import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';
import { NewServiceFormInput, useNewServiceForm } from './useForm';
import { useOptions } from './useOptions';

function NewServiceForm({ className }: TProps): React.ReactElement {
  const form = useNewServiceForm();
  const ops = useOptions();
  const navigate = useNavigate();
  const { errors } = form.formState;

  const onSubmit: SubmitHandler<NewServiceFormInput> = async (values) => {
    try {
      const res = await api<{ data: string }>('/services/', {
        method: 'POST',
        body: values,
      });

      toast.success('Created successfully. You will be redirected.');

      setTimeout(() => {
        navigate(`/services/${encodeURIComponent(res.data)}`);
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

      <div className="mt-8 flex items-end space-x-4">
        <Input
          label="Price"
          type="text"
          placeholder="Enter an amount"
          error={errors.price}
          {...form.register('price')}
        />

        <Select
          options={ops.price}
          className="py-0.5"
          aria-label={'Select a currency'}
          onChange={(newValue): void => {
            form.setValue('priceUnit', newValue?.value ?? 'USD');
            form.trigger('priceUnit');
          }}
        />

        <Select
          options={ops.timespan}
          className="py-0.5"
          aria-label={'Select a timespan'}
          onChange={(newValue): void => {
            form.setValue('priceTimespan', newValue?.value ?? 0);
            form.trigger('priceTimespan');
          }}
        />
      </div>

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

      <div className="mt-8 flex items-end space-x-4">
        <Input
          label="Delivery Time"
          type="number"
          placeholder="Enter a duration"
          value={form.getValues('deliveryTime')}
          error={errors.deliveryTime}
          onChange={(e) => {
            form.setValue('deliveryTime', e.target.valueAsNumber);
            form.trigger('deliveryTime');
          }}
        />

        <Select
          options={ops.timespan}
          className="py-0.5"
          aria-label={'Select a timespan'}
          onChange={(newValue): void => {
            form.setValue('deliveryTimespan', newValue?.value ?? 0);
            form.trigger('deliveryTimespan');
          }}
        />
      </div>

      <Button
        className="mt-8 w-min"
        appearance="sky"
      >
        Create
      </Button>
    </form>
  );
}

export default NewServiceForm;
