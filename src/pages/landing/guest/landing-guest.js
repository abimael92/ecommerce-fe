import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import { HeroLayout } from '@/layouts';
import { Seo } from '@/components/Shared';
import styles from './landing-guest.module.scss';

export default function LandingGuestPage() {
  return (
    <>
      <Seo title="Welcome" />

      <HeroLayout>
        <div className={styles.homeContainer}>
          <div className={styles.homeHeaderWrapper}>
            <h1 className={styles.homeHeader}>
              Welcome to the Ultimate Gaming Experience!
            </h1>
          </div>

          <div className={styles.homeInfo}>
            <p>
              Explore our collection of the latest and greatest video games.
              Find the games that match your passion and immerse yourself in the
              gaming world. <br />
              <br />
              Whether you're into action, adventure, strategy, or simulation,
              we've got something for every gamer.
            </p>

            <div className={styles.actions}>
              <Button size="huge" className={styles.tryOutButton}>
                <Link href="join/sign-in" legacyBehavior>
                  <a>Try out now</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </HeroLayout>
    </>
  );
}
