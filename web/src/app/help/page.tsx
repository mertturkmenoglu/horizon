import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from './data';

export default async function Page() {
  return (
    <>
      <div className="mt-16 flex flex-col items-center justify-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {faqData.title}
        </h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {faqData.subtitle}
        </h3>
      </div>
      <div className="mx-auto my-16 max-w-xl">
        {faqData.groups.map((group) => (
          <div key={group.title}>
            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
              {group.title}
            </h4>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {group.items.map((item) => (
                <AccordionItem
                  value={item.question}
                  key={item.question}
                >
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
}
