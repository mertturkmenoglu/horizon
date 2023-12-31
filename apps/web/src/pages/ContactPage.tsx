import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Input from '@/components/Input';
import Logo from '@/components/Logo';
import TextArea from '@/components/TextArea';
import { cn } from '@/lib/cn';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email().min(1).max(100),
  phoneNumber: z.string().min(1).max(32),
  subject: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
});

type ContactInput = z.infer<typeof contactSchema>;

function ContactPage(): React.ReactElement {
  const { t } = useTranslation('contact');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactInput) => {
    const mailToAddress = 'gethorizonapp@gmail.com';
    const mailBody = `Name: ${data.fullName} \nEmail: ${data.email} \nPhone: ${data.phoneNumber} \nMessage: ${data.message}`;
    window.location.href = `mailto:${mailToAddress}?subject=${data.subject}&body=${mailBody}`;
  };

  return (
    <main>
      <div className="mx-auto mt-16 max-w-3xl">
        <a
          href="/"
          className="flex w-fit items-center space-x-4 hover:underline"
        >
          <ArrowLeftIcon className="size-5" />
          <span>{t('home')}</span>
        </a>

        <div className="mt-8 flex w-full flex-col items-center">
          <Logo />
          <h2 className="text-4xl font-extrabold">Horizon</h2>
          <div className="mt-8 text-2xl font-light text-midnight">
            {t('contact-us')}
          </div>
        </div>

        <form
          className={cn('mt-8 grid grid-cols-2 gap-4')}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label={t('full-name')}
            className="w-full"
            placeholder={t('full-name-ph')}
            autoComplete="name"
            error={errors.fullName}
            {...register('fullName')}
          />

          <Input
            label={t('email')}
            className="w-full"
            placeholder={t('email-ph')}
            autoComplete="email"
            error={errors.email}
            {...register('email')}
          />

          <Input
            label={t('phone')}
            className="w-full"
            placeholder={t('phone-ph')}
            autoComplete="tel"
            error={errors.phoneNumber}
            {...register('phoneNumber')}
          />

          <Input
            label={t('subject')}
            className="w-full"
            placeholder={t('subject-ph')}
            error={errors.subject}
            {...register('subject')}
          />

          <TextArea
            label={t('message')}
            className="col-span-2 w-full"
            rows={3}
            placeholder={t('message-ph')}
            error={errors.message}
            {...register('message')}
          />

          <Button
            appearance="sky"
            className="col-span-2 mx-auto mt-4 max-w-48"
            type="submit"
          >
            {t('send')}
          </Button>
        </form>

        <Footer className="mt-16" />
      </div>
    </main>
  );
}

export default ContactPage;
