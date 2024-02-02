import { ContactInput } from './useContactForm';

export function useOnSubmit() {
  return (data: ContactInput) => {
    const e = encodeURIComponent;
    const mailToAddress = 'gethorizonapp@gmail.com';
    const mailBody = `Name: ${e(data.fullName)} \nEmail: ${e(
      data.email
    )} \nPhone: ${e(data.phoneNumber)} \nMessage: ${e(data.message)}`;
    const redirect = `mailto:${e(mailToAddress)}?subject=${e(
      data.subject
    )}&body=${e(mailBody)}`;
    window.location.href = redirect;
  };
}
