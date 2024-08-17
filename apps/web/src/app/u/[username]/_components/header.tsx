import UserImage from '@/components/blocks/user-image';
import { Button } from '@/components/ui/button';
import { GetUserProfileByUsernameResponseDto } from '@/lib/dto';
import { SendIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  user: GetUserProfileByUsernameResponseDto;
};

export default function Header({ user }: Props) {
  const initials = user.fullName
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  const firstName = user.fullName.split(' ').at(0)?.slice(0, 18) ?? '';
  const joinDate = new Date(user.createdAt ?? Date.now()).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <div>
      <UserImage
        className="size-24"
        src={user.profileImage}
        initials={initials}
      />
      <div className="mt-8 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
        <div>
          <h2 className="scroll-m-20 text-3xl font-medium tracking-tight lg:text-4xl">
            {user.fullName}
          </h2>
          <p className="text-base1 text-muted-foreground">
            <span className="text-sky-500">@</span>
            {user.username}
          </p>
          <div className="mt-2 text-sm text-muted-foreground">
            Joined: {joinDate}
          </div>
        </div>
        <div className="flex w-full flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-end">
          <Link
            href="#more"
            className=""
          >
            <Button
              variant="outline"
              asChild
            >
              <div className="w-full">More</div>
            </Button>
          </Link>
          <Link
            href=""
            className=""
          >
            <Button asChild>
              <div className="flex w-full items-center gap-2">
                <span>Contact {firstName}</span>
                <SendIcon className="size-4" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
