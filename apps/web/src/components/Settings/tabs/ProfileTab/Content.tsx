import { GetMeResponse } from '@/lib/dto';
import ProfileImageForm from './ProfileImageForm';
import ProfileForm from './ProfileForm';
import ContactInformationForm from './ContactInformationForm';

type Props = {
  user: GetMeResponse;
};

function Content({ user }: Props): React.ReactElement {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Profile Settings</h2>
      <hr className="w-full h-[2px] bg-black" />

      <ProfileImageForm className="max-w-lg mt-4" />

      <h2 className="text-2xl font-semibold mt-8">About You</h2>
      <hr className="w-full h-[2px] bg-black" />

      <ProfileForm
        className="mt-4"
        user={user}
      />

      <h2 className="text-2xl font-semibold mt-8">Contact Information</h2>
      <hr className="w-full h-[2px] bg-black" />
      <div className="text-xs text-neutral-500 font-medium mt-1">
        The information you provide here will be visible to all users.
      </div>

      <ContactInformationForm
        user={user}
        className="mt-0"
      />
    </div>
  );
}

export default Content;
