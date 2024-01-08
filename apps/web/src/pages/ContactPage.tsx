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
      <div className="max-w-3xl mx-auto mt-16">
        <a
          href="/"
          className="flex items-center space-x-4 hover:underline w-min"
        >
          <ArrowLeftIcon className="size-5" />
          <span>{t('home')}</span>
        </a>

        <div className="w-full flex flex-col items-center mt-8">
          <Logo />
          <h2 className="text-4xl font-extrabold">Horizon</h2>
          <div className="text-midnight text-2xl font-light mt-8">
            {t('contact-us')}
          </div>
        </div>

        <form
          className={cn('grid grid-cols-2 gap-4 mt-8')}
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
            className="w-full col-span-2"
            rows={3}
            placeholder={t('message-ph')}
            error={errors.message}
            {...register('message')}
          />

          <Button
            appearance="sky"
            className="col-span-2 mx-auto max-w-48 mt-4"
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
