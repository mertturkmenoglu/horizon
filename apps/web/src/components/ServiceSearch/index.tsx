import { cn } from '@/lib/cn';
import Input from '../Input';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const schema = z.object({
  term: z.string().min(1).max(128),
});

type ServiceSearchInput = z.infer<typeof schema>;

function ServiceSearch({ className }: TProps): React.ReactElement {
  const { register, handleSubmit } = useForm<ServiceSearchInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ServiceSearchInput> = (values) => {
    console.log(values);
  };

  return (
    <form
      className={cn('group rounded', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-stretch w-full">
        <Input
          label=""
          className={cn(
            'max-w-2xl w-full group-focus-within:max-w-none group-focus-within:w-full',
            'transition-all ease-in-out duration-200'
          )}
          inputClassName="rounded-r-none focus:ring-0 focus:border-none py-3 text-base placeholder:text-base"
          placeholder="Search for a service e.g: plumbing, baby sitter, tax consulting, ..."
          {...register('term')}
        />
        <Button
          appearance="midnight"
          className="px-2 w-14 flex items-center justify-center rounded-l-none hover:bg-opacity-90"
        >
          <MagnifyingGlassIcon className="size-6 text-white" />
        </Button>
      </div>

      <div className="hidden group-focus-within:block border border-midnight/20 rounded p-2 space-y-2 mt-2">
        <div>Your last searches:</div>
        {[
          'Web Design',
          'Baby sitter',
          'Italian teacher',
          'Biology tutor',
          'Music band for a wedding',
        ].map((i) => (
          <button
            key={i}
            className={cn(
              'bg-neutral-400/10 hover:bg-neutral-400/20',
              'px-4 py-1 w-full flex rounded',
              'focus:outline-none focus:ring focus:ring-sky-500 focus:bg-neutral-400/20'
            )}
          >
            {i}
          </button>
        ))}
      </div>
    </form>
  );
}

export default ServiceSearch;
