import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion';
import Breadcrumb from '@/components/Breadcrumb';
import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

function HelpPage(): React.ReactElement {
  const { t } = useTranslation('help');

  return (
    <MainLayout>
      <Breadcrumb
        items={[{ href: '/help', text: t('breadcrumb.title') }]}
        className="mt-8"
      />

      <h2 className="mt-16 text-4xl font-bold text-midnight">{t('title')}</h2>

      <h3
        id="faq"
        className="mt-16 text-xl font-bold"
      >
        {t('faq.title')}
      </h3>

      <div className="max-w-2xl">
        <Accordion
          type="multiple"
          className="mt-4"
        >
          {new Array(10).fill(0).map((_, i) => (
            <AccordionItem value={`item-${i + 1}`}>
              <AccordionTrigger>{t(`faq.items.${i}.title`)}</AccordionTrigger>
              <AccordionContent>{t(`faq.items.${i}.content`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="grid grid-cols-3"></div>
    </MainLayout>
  );
}

export default HelpPage;
