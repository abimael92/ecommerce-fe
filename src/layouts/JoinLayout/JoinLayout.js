import { Icon, Image } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import styles from './JoinLayout.module.scss';

export function JoinLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/');
    return null;
  }

  const isSignIn = router.pathname === '/join/sign-in';

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

      <div className={styles.blockContainer}>
        {isSignIn ? (
          <>
            <div className={styles.blockLeft_SignIn}>{children}</div>
            <div className={styles.blockRight_SignIn} />
          </>
        ) : (
          <>
            <div className={styles.blockLeft_SignUp} />
            <div className={styles.blockRight_SignUp}>{children}</div>
          </>
        )}
      </div>
    </div>
  );
}
