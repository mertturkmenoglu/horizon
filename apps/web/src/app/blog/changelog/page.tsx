import BackLink from '@/components/blocks/back-link';
import Changelog from '@/components/blocks/changelog';

export default function Page() {
  return (
    <div className="container mx-auto my-16 max-w-5xl">
      <BackLink href="/blog" />

      <Changelog.Root>
        <Changelog.Entry
          time="3 days ago"
          title="Social Login: Google"
          content="You can use your Google account to sign up to and start using Horizon."
        />
        <Changelog.Entry
          time="5 days ago"
          title="New Authentication Method: Credentials"
          content="You can sign up using your email and sign in with your email and password to Horizon now."
        />
        <Changelog.Entry
          time="1 week ago"
          title="Horizon V2 is in progress"
          content="We are rewriting Horizon to give you a better experience."
        />
      </Changelog.Root>
    </div>
  );
}
