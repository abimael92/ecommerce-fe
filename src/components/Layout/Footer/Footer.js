import Link from 'next/link';
import { Container, Image, Button } from 'semantic-ui-react';
import LogoTitle from '@/components/Layout/LogoTitle';

import styles from './Footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <LogoTitle size="BIG" />

          <div>
            <ul>
              <Link href="#">Terms and Conditions</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Contact</Link>
              <Link href="#">FAQs</Link>
            </ul>
          </div>

          <div className={styles.social}>
            <Button as="a" href="#" circular color="facebook" icon="facebook" />
            <Button as="a" href="#" circular color="twitter" icon="twitter" />
            <Button as="a" href="#" circular color="linkedin" icon="linkedin" />
            <Button as="a" href="#" circular color="youtube" icon="youtube" />
          </div>
        </div>

        <div className={styles.copyright}>
          <span>Copyright © {currentYear} Gaming - All rights reserved</span>
        </div>
      </Container>
    </div>
  );
}
