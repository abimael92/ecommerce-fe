import Link from 'next/link';
import { Container, Image, Button, Icon } from 'semantic-ui-react';
import LogoTitle from '@/components/Layout/LogoTitle';

import styles from './Footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <LogoTitle size="SMALL" />

          <div>
            <ul>
              <Link href="#">Terms and Conditions</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Contact</Link>
              <Link href="#">FAQs</Link>
            </ul>
          </div>
          <div className={styles.social}>
            <Button
              as="a"
              href="https://www.facebook.com/"
              target="_blank"
              circular
              color="facebook"
            >
              <Icon name="facebook" className={styles.icon} />
            </Button>
            <Button
              as="a"
              href="https://twitter.com/"
              target="_blank"
              circular
              color="twitter"
            >
              <Icon name="twitter" className={styles.icon} />
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/"
              target="_blank"
              circular
              color="linkedin"
            >
              <Icon name="linkedin" className={styles.icon} />
            </Button>
            <Button
              as="a"
              href="https://www.youtube.com/"
              target="_blank"
              circular
              color="youtube"
            >
              <Icon name="youtube" className={styles.icon} />
            </Button>
          </div>
        </div>

        <div className={styles.copyright}>
          <span>Copyright © {currentYear} Gaming Arena - All rights reserved</span>
        </div>
      </Container>
    </div>
  );
}
