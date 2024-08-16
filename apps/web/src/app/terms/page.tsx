import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="mx-auto my-16 max-w-2xl text-wrap">
      <h1 className="pb-3 text-center text-2xl font-bold">
        Horizon - Terms of Service
      </h1>
      <div className="mt-2 font-semibold">Effective Date: June 13, 2024</div>
      <p className="mt-4">
        Welcome to Horizon! These Terms of Service (&quot;Terms&quot;) govern
        your use of the Horizon application and its related services (the
        &quot;Service&quot;). By using the Service, you agree to comply with and
        be bound by these Terms. If you do not agree with these Terms, please do
        not use the Service.
      </p>
      <ol className="mt-8 space-y-4">
        <li>
          <span className="font-bold">1. Acceptance of Terms</span>: By
          accessing or using Horizon, you acknowledge that you have read,
          understood, and agree to be bound by these Terms. Horizon reserves
          the right to update, change, or modify these Terms at any time without
          prior notice. It is your responsibility to review these Terms
          periodically.
        </li>
        <li>
          <span className="font-bold">2. User Registration</span>: To access
          certain features of the Service, you must register an account. You
          agree to provide accurate, current, and complete information during
          the registration process and to update such information to keep it
          accurate, current, and complete.
        </li>
        <li>
          <span className="font-bold">3. User Responsibilities</span>:
          <ol className="ml-4">
            <li>
              <span className="font-bold">a. Listing Services</span>: Users are
              solely responsible for the accuracy and completeness of the
              information provided when listing services. Horizon reserves
              the right to remove any content that violates these Terms or is
              deemed inappropriate.
            </li>
            <li>
              <span className="font-bold">b. Communication</span>: Users agree
              to use the communication features within the app responsibly. Any
              communication that is harassing, offensive, or violates the rights
              of others is strictly prohibited.
            </li>
          </ol>
        </li>
        <li>
          <span className="font-bold">4. Transactions</span>:
          <ol className="ml-4">
            <li>
              <span className="font-bold">a. Enlisting Services</span>: Users
              may enlist for services listed on Horizon. The transaction
              terms, including payment and service details, are to be agreed
              upon between the service provider and the user. Horizon is not
              responsible for any issues arising from transactions.
            </li>
            <li>
              <span className="font-bold">b. Service Providers</span>: Service
              providers are responsible for delivering the enlisted services as
              described. Failure to do so may result in account suspension or
              termination.
            </li>
          </ol>
        </li>
        <li>
          <span className="font-bold">5. Privacy Policy</span>: Your use of the
          Service is also governed by our Privacy Policy, which can be found
          <Button
            variant="link"
            asChild
            className="p-1"
          >
            <Link href="/privacy">here</Link>
          </Button>
          and is incorporated by reference into these Terms.
        </li>
        <li>
          <span className="font-bold">6. Termination</span>: Horizon reserves
          the right to suspend or terminate your account at any time, without
          notice, for conduct that we believe violates these Terms or is harmful
          to other users of the Service, to Horizon, or to third parties.
        </li>
        <li>
          <span className="font-bold">7. Disclaimers</span>: Horizon is
          provided &quot;as is&quot; and without any warranty or condition,
          express, implied, or statutory. We do not guarantee the availability,
          accuracy, completeness, reliability, or timeliness of the Service.
        </li>
        <li>
          <span className="font-bold">8. Limitation of Liability</span>: In no
          event shall Horizon be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly.
        </li>
        <li>
          <span className="font-bold">9. Governing Law</span>: These Terms shall
          be governed by and construed in accordance with the laws of Turkey.
        </li>
        <li>
          <span className="font-bold">10. Contact Information</span>: For
          questions about these Terms or the Service, please contact us at
          <Button
            variant="link"
            asChild
            className="p-1"
          >
            <a href="mailto:gethorizonapp@gmail.com">
              gethorizonapp [at] gmail [dot] com
            </a>
          </Button>
        </li>
      </ol>

      <p className="mt-8">
        By using the Horizon, you agree to these Terms of Service. Thank you
        for being a part of our community!
      </p>
    </div>
  );
}
