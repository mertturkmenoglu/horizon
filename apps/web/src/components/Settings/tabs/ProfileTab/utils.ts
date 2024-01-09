import countryCodes from 'country-codes-list';

export const phoneOptions = countryCodes
  .all()
  .map(({ countryCallingCode, countryCode, flag }) => {
    return {
      value: countryCallingCode,
      label: flag + ' ' + countryCode + ' +' + countryCallingCode,
    };
  });

export function getPhoneWithoutCallingCode(phone: string): string {
  if (phone === '') {
    return '';
  }

  if (phone.length > 10) {
    return phone.substring(phone.length - 10);
  }

  return phone;
}

export function getDefaultValue(phone: string) {
  for (const option of phoneOptions) {
    if (phone.startsWith('+' + option.value)) {
      return option;
    }
  }

  return undefined;
}
