import Link from 'next/link';
import { Icon, Image } from 'semantic-ui-react';
import styles from './HeroLayout.module.scss';

export function HeroLayout(props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/">
          {' '}
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image src="/images/logo.png" alt="Game" height={80} />
            </div>
            <div className={styles.imageWrapper}>
              <Image src="/images/gaming.png" alt="Gaming" height={40} />
            </div>
          </div>
        </Link>

        <Link href="/">
          <Icon name="close" />
        </Link>
      </div>

      <div className={styles.blockLeft}>{children}</div>

      <div className={styles.blockRight} />
    </div>
  );
}
