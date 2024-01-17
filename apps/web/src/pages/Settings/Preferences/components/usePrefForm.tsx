import { isValidLangKey, validLangKeys } from '@/lib/lang';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  lang: z.enum(['en', 'tr']),
});

type PreferencesInput = z.infer<typeof schema>;

export function usePrefForm() {
  const { t, i18n } = useTranslation('settings', { keyPrefix: 'preferences' });
  const lsLang = localStorage.getItem('lang') ?? '';
  const defaultLang = isValidLangKey(lsLang) ? lsLang : 'en';

  const form = useForm<PreferencesInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      lang: defaultLang,
    },
  });

  const options = validLangKeys.map((key) => ({
    value: key,
    label: t(`lang.${key}`),
  }));

  const onSubmit: SubmitHandler<PreferencesInput> = async (values) => {
    localStorage.setItem('lang', values.lang);
    await i18n.changeLanguage(values.lang);
    await i18n.reloadResources(validLangKeys, 'settings-tabs');
    toast.success(t('lang-ok'));
  };

  const defaultSelectValue = options.find((o) => o.value === defaultLang);

  return {
    options,
    onSubmit,
    defaultSelectValue,
    ...form,
  };
}
