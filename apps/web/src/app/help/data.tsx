import { Button } from '@/components/ui/button';

type FAQ = {
  title: string;
  subtitle: string;
  groups: FAQGroup[];
};

type FAQGroup = {
  title: string;
  items: FAQItem[];
};

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

export const faqData: FAQ = {
  title: 'Help Center',
  subtitle: 'How can we help you?',
  groups: [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is Horizon?',
          answer: (
            <div>
              Horizon is an innovative platform that empowers users to
              seamlessly connect with service providers and access a diverse
              range of services. By registering on the app, individuals can
              showcase the services they offer, creating a virtual marketplace
              for users seeking specific solutions. Users can effortlessly
              browse through the listed services, connect with providers, and
              even enlist for desired services, fostering a dynamic community of
              service seekers and providers. Horizon&apos;s user-friendly
              interface and robust features streamline the process of finding
              and offering services, making it a go-to platform for those
              seeking convenience and efficiency in the service industry.
            </div>
          ),
        },
        {
          question: 'How do I sign up for Horizon?',
          answer: (
            <div>
              To sign up, visit Horizon website and follow the on-screen
              instructions to create a new account using your email address or
              social media login.
            </div>
          ),
        },
      ],
    },
    {
      title: 'Using Horizon',
      items: [
        {
          question: 'Can I list multiple services on Horizon?',
          answer: (
            <div>
              Absolutely! Horizon allows you to showcase a variety of services
              you offer. After registering, click to your name on the app bar,
              select &apos;Services&apos;, and create new service button to add
              the services you provide.
            </div>
          ),
        },
        {
          question: 'How do users contact me for my services?',
          answer: (
            <div>
              Users can easily reach out to you by using the in-app messaging
              feature. Once they find your service listing, there will be an
              option to initiate contact and discuss their specific
              requirements.
            </div>
          ),
        },
        {
          question:
            'Is there a verification process for service providers on Horizon?',
          answer: (
            <div>
              Yes, Horizon prioritizes user safety. We have a verification
              process to ensure the authenticity of service providers. You may
              be required to submit relevant documentation during the
              registration process.
            </div>
          ),
        },
      ],
    },
    {
      title: 'Services',
      items: [
        {
          question: 'Can I review and rate services as a user on Horizon?',
          answer: (
            <div>
              Absolutely! We encourage users to share their experiences. After
              receiving a service, you can leave a review and rate the provider.
              This helps maintain a trustworthy community within Horizon.
            </div>
          ),
        },
        {
          question: 'How can I contact a provider on Horizon?',
          answer: (
            <div>
              To contact a provider, navigate to the service listing, review the
              details, and use the provided contact option to reach out to the
              service provider. Discuss the specifics and finalize the
              arrangement.
            </div>
          ),
        },
        {
          question: 'Are there any fees associated with using Horizon?',
          answer: (
            <div>
              During the beta period of the development, using Horizon is free.
              Plans may change in the future. We will notify you about pricing
              changes and give you time to adopt to new plans.
            </div>
          ),
        },
        {
          question: 'Can I edit my service listings after they are published?',
          answer: (
            <div>
              Yes, you have the flexibility to edit your service listings at any
              time. Simply go to your profile, find the service you want to
              modify, and click on the edit option.
            </div>
          ),
        },
        {
          question: 'How does Horizon prioritize service listings for users?',
          answer: (
            <div>
              Horizon uses a custom algorithm that considers various factors,
              including user ratings and reviews, to present relevant and
              high-quality service listings. This ensures users find the best
              services for their needs. Our project is open-source and you can
              view the source code on GitHub.
            </div>
          ),
        },
      ],
    },
    {
      title: 'Technical Support',
      items: [
        {
          question: 'What should I do if I encounter a problem with the app?',
          answer: (
            <div>
              If you experience any issues with the app, please visit the
              &quot;Help & Support&quot; section in the app or contact our
              support team directly via email at{' '}
              <Button
                variant="link"
                asChild
              >
                <a href="mailto:gethorizonapp@gmail.com">
                  gethorizonapp [at] gmail [dot] com
                </a>
              </Button>
            </div>
          ),
        },
        {
          question: 'How can I report inappropriate content or behavior?',
          answer: (
            <div>
              To report inappropriate content or behavior, tap the
              &quot;Report&quot; button found on the relevant page or profile.
              Provide as much detail as possible, and our team will review the
              report promptly.
            </div>
          ),
        },
      ],
    },
    {
      title: 'Account Management',
      items: [
        {
          question: 'How do I reset my password?',
          answer: (
            <div>
              To reset your password, go to the sign in screen and tap
              &quot;Forgot Password.&quot; Follow the instructions to receive a
              password reset link via email.
            </div>
          ),
        },
        {
          question: 'How can I delete my account?',
          answer: (
            <div>
              If you wish to delete your account, contact our team via email at{' '}
              <Button
                variant="link"
                asChild
              >
                <a href="mailto:gethorizonapp@gmail.com">
                  gethorizonapp [at] gmail [dot] com
                </a>
              </Button>
              Please note that this action is irreversible and all your data
              will be permanently deleted.
            </div>
          ),
        },
      ],
    },
    {
      title: 'Privacy and Security',
      items: [
        {
          question: 'How is my personal information protected?',
          answer: (
            <div>
              We take your privacy seriously and use advanced security measures
              to protect your data. For more details, please read our Privacy
              Policy available on our website.
            </div>
          ),
        },
      ],
    },
  ],
};
