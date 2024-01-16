import Button from '@/components/Button';
import { GetMeResponse } from '@/lib/dto';
import { isValidLangKey, validLangKeys } from '@/lib/lang';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { toast } from 'sonner';
import { z } from 'zod';

export type Props = {
  user: GetMeResponse;
};

const schema = z.object({
  lang: z.enum(['en', 'tr']),
});

type PreferencesInput = z.infer<typeof schema>;

function Content({}: Props): React.ReactElement {
  const { t, i18n } = useTranslation('settings', { keyPrefix: 'preferences' });
  const lsLang = localStorage.getItem('lang') ?? '';
  const defaultLang = isValidLangKey(lsLang) ? lsLang : 'en';
  const { handleSubmit, setValue, trigger } = useForm<PreferencesInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      lang: defaultLang,
    },
  });

  const onSubmit: SubmitHandler<PreferencesInput> = async (values) => {
    localStorage.setItem('lang', values.lang);
    await i18n.changeLanguage(values.lang);
    await i18n.reloadResources(validLangKeys, 'settings-tabs');
    toast.success(t('lang-ok'));
  };

  const options = validLangKeys.map((key) => ({
    value: key,
    label: t(`lang.${key}`),
  }));

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <form
        className="mt-4 flex max-w-lg flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="pref-lang-select"
          className="text-sm font-semibold text-midnight"
        >
          {t('lang-label')}
        </label>

        <Select
          options={options}
          className=""
          id="pref-lang-select"
          aria-label={t('lang-select')}
          defaultValue={options.find((o) => o.value === defaultLang)}
          onChange={(newValue): void => {
            setValue('lang', newValue?.value ?? 'en');
            trigger('lang');
          }}
        />

        <Button
          appearance="sky"
          className="mt-4 max-w-32 self-end"
          type="submit"
        >
          {t('update')}
        </Button>
      </form>
    </div>
  );
}

export default Content;
