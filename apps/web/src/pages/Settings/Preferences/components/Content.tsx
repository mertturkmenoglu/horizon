import Button from '@/components/Button';
import { GetMeResponse } from '@/lib/dto';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { usePrefForm } from './usePrefForm';

export type Props = {
  user: GetMeResponse;
};

function Content({}: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'preferences' });

  const {
    handleSubmit,
    setValue,
    trigger,
    onSubmit,
    options,
    defaultSelectValue,
  } = usePrefForm();

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
          defaultValue={defaultSelectValue}
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
