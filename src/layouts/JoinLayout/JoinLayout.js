import { Icon, Image } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import LogoTitle from '@/components/Layout/LogoTitle';
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
        <LogoTitle size="MEDIUM" />

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
