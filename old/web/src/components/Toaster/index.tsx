import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={'light'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-600',
          actionButton: 'group-[.toast]:bg-midnight group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-gray-600 group-[.toast]:text-gray-200',
          success:
            'group toast group-[.toaster]:bg-green-500 group-[.toaster]:text-white group-[.toaster]:border-green-500 group-[.toaster]:shadow-lg',
          error:
            'group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-red-500 group-[.toaster]:shadow-lg',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
