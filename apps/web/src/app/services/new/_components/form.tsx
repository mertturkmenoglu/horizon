'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/lib/categories';
import { PriceUnitsArr, WorkTimespanArr } from '@/lib/monetary';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'At least 5 characters' })
    .max(64, { message: 'Max 64 characters' }),
  description: z
    .string()
    .min(5, { message: 'At least 5 characters' })
    .max(4096, { message: 'Max 4096 characters' }),
  category: z.number().int().min(1).max(32),
  price: z.number().nonnegative().min(1).max(10_000),
  priceUnit: z.enum(PriceUnitsArr),
  priceTimespan: z.enum(WorkTimespanArr),
  isOnline: z.boolean(),
  url: z.string().optional(),
  location: z.string().min(1).max(256),
  deliveryTime: z.number().int().min(1).max(32),
  deliveryTimespan: z.enum(WorkTimespanArr),
});

type FormInput = z.infer<typeof schema>;

export default function NewServiceForm() {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto my-8 grid max-w-3xl grid-cols-1 gap-8 lg:grid-cols-2"
    >
      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title of your service"
          autoComplete="off"
          {...form.register('title')}
        />
        <InputError error={form.formState.errors.title} />
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="Write a description for your service. Explain what is your service, what you do, how you work, and other information your customers might want to know."
          autoComplete="off"
          {...form.register('description')}
        />
        <InputError error={form.formState.errors.description} />
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="category">Category</Label>
        <Select {...form.register('category')}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectGroup key={category.category}>
                <SelectLabel>{category.category}</SelectLabel>
                {category.subcategories.map((subcategory) => (
                  <SelectItem
                    key={subcategory.id}
                    value={'' + subcategory.id}
                  >
                    {subcategory.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          placeholder="Price"
          autoComplete="off"
          {...form.register('price')}
        />
        <InputError error={form.formState.errors.price} />
      </div>

      <div>
        <Label htmlFor="price-unit">Price Unit</Label>
        <Select {...form.register('priceUnit')}>
          <SelectTrigger id="price-unit">
            <SelectValue placeholder="Select a price unit" />
          </SelectTrigger>
          <SelectContent>
            {PriceUnitsArr.map((priceUnit) => (
              <SelectItem
                key={priceUnit}
                value={priceUnit}
              >
                {priceUnit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="price-timespan">Price Timespan</Label>
        <Select {...form.register('priceTimespan')}>
          <SelectTrigger
            id="price-timespan"
            className="max-w-md"
          >
            <SelectValue placeholder="Select a price timespan" />
          </SelectTrigger>
          <SelectContent>
            {WorkTimespanArr.map((timespan) => (
              <SelectItem
                key={timespan}
                value={timespan}
                className="capitalize"
              >
                {timespan.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Checkbox
          {...form.register('isOnline')}
          checked={form.getValues('isOnline')}
          onCheckedChange={(checked) =>
            form.setValue('isOnline', checked === true)
          }
        />
        <div className="-mt-2">
          <Label>Is Online</Label>
          <p className="text-[0.8rem] text-muted-foreground">
            Indicates if this service is provided online.
          </p>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="url">URL</Label>
        <Input
          type="url"
          id="url"
          placeholder="URL of your service if it is an online service"
          autoComplete="off"
          {...form.register('url')}
        />
        <InputError error={form.formState.errors.url} />
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          placeholder="Location of your service"
          autoComplete="off"
          {...form.register('location')}
        />
        <InputError error={form.formState.errors.location} />
      </div>

      <div>
        <Label htmlFor="delivery-time">Delivery Time</Label>
        <Input
          type="number"
          id="delivery-time"
          placeholder="Delivery time"
          autoComplete="off"
          {...form.register('deliveryTime')}
        />
        <InputError error={form.formState.errors.deliveryTime} />
      </div>

      <div className="">
        <Label htmlFor="delivery-timespan">Delivery Timespan</Label>
        <Select {...form.register('deliveryTimespan')}>
          <SelectTrigger
            id="delivery-timespan"
            className="max-w-md"
          >
            <SelectValue placeholder="Select a delivery timespan" />
          </SelectTrigger>
          <SelectContent>
            {WorkTimespanArr.map((timespan) => (
              <SelectItem
                key={timespan}
                value={timespan}
                className="capitalize"
              >
                {timespan.toLowerCase().slice(0, -2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1 flex flex-col items-end lg:col-span-2">
        <div className="bg-red-500 py-4"></div>
        <Button>Create new service</Button>
      </div>
    </form>
  );
}
