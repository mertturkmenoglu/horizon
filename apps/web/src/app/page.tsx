import ActionBanner from '@/components/blocks/action-banner';
import CategoryNavigation from '@/components/blocks/category-navigation';
import FeaturesCarousel from '@/components/blocks/features-carousel';
import OverlayBanner from '@/components/blocks/overlay-banner';
import VerticalBanner from '@/components/blocks/vertical-banner';
import { Button } from '@/components/ui/button';
import { getAuth } from '@/lib/auth';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Search from './_components/search';
import SignedInCta from './_components/signed-in-cta';
import SignedOutCta from './_components/signed-out-cta';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const auth = await getAuth();
  const isSignedIn = auth !== null;

  return (
    <main className="container">
      <CategoryNavigation className="mt-12" />
      <Search />

      <OverlayBanner
        image="https://images.unsplash.com/photo-1464219995203-d9e0a71964d6?q=80&w=2670&auto=format&fit=crop"
        alt="Horizon Banner Image"
        message="Your Service. Your Choice. Your Horizon."
        className="my-8"
      />

      {isSignedIn ? (
        <SignedInCta fullName={auth.data.fullName} />
      ) : (
        <SignedOutCta />
      )}

      {/* BrowseCategoriesGrid */}
      {/* Recommendation Grid - Popular */}
      {/* Recommendation Grid - New */}

      <FeaturesCarousel className="mx-auto mt-16 max-w-5xl" />

      <OverlayBanner
        image="https://images.unsplash.com/photo-1607388510015-c632e99da586?q=80&w=2574&auto=format&fit=crop"
        alt="Categories Banner Image"
        message={
          <div className="flex items-center gap-4">
            <div>Discover the services around you</div>
            <Button
              asChild
              variant="default"
            >
              <Link href="/categories">See categories</Link>
            </Button>
          </div>
        }
        className="my-8"
        imgClassName="aspect-[3]"
      />

      <VerticalBanner
        image="https://images.unsplash.com/photo-1665686306574-1ace09918530?q=80&w=512&auto=format&fit=crop"
        imageClassName="object-cover"
        alt="Start expanding your business"
        content={
          <>
            <div className="text-center">
              <h2 className="mt-8 font-serif text-3xl font-bold text-black/80">
                Start Expanding Your Business
              </h2>
              <p className="font-serif text-muted-foreground">
                Easily connect with your potential customers and extend your
                network.
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="mt-8"
              >
                <div className="flex items-center gap-2">
                  <Link href="/services/new">List Your Services</Link>
                  <ArrowRight className="size-4 animate-pulse" />
                </div>
              </Button>
            </div>
          </>
        }
      />

      <ActionBanner
        image="https://images.unsplash.com/photo-1616587224026-668840f26916?q=80&w=1024&auto=format&fit=crop"
        alt="Book Trusted Professionals Near You Today!"
        message={
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-primary">
              Book Trusted Professionals Near You Today!
            </div>
            <div className="text-sm text-muted-foreground">
              From home repairs to event planning, find top-rated experts ready
              to help. Fast, reliable, and hassle-free.
            </div>
            <Button
              asChild
              variant="default"
            >
              <Link href="/services/nearby">Show Services Near Me</Link>
            </Button>
          </div>
        }
        className="my-8"
        imgClassName=""
      />

      <ActionBanner
        image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1024&auto=format&fit=crop"
        alt="Unlock New Opportunities for Your Business"
        message={
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-primary">
              Unlock New Opportunities for Your Business
            </div>
            <div className="text-sm text-muted-foreground">
              Apply to become a verified account on Horizon. Increase your
              chance to connect with your customers, boost your profile.
            </div>
            <Button
              asChild
              variant="secondary"
            >
              <Link href="/apply/verified">Apply to be verified</Link>
            </Button>
          </div>
        }
        className="my-8"
        imgClassName=""
        lefty={false}
      />
    </main>
  );
}
