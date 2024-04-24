import { Button, Icon, Label } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useAuth, useCart } from '@/hooks';
import styles from './Account.module.scss';

export function Account() {
  const { user } = useAuth();
  const { total } = useCart();
  const router = useRouter();

  const goToLogin = () => router.push('/join/sign-in');
  const goToAccount = () => router.push('/account');

  const goToCart = () => {
    if (!user) goToLogin();
    else router.push('/cart');
  };

  return (
    <div className={styles.account}>
      <Button
        icon
        className={classNames(styles.button, styles.cart)}
        onClick={goToCart}
      >
        <Icon name="cart" />
        {user && <span className={styles.userName}>Cart</span>}
        <span className={styles.label}>{total}</span>
      </Button>

      <Button
        icon
        className={classNames(styles.button, styles.user, {
          [styles.loggedIn]: user,
        })}
        onClick={user ? goToAccount : goToLogin}
      >
        <Icon name="user outline" />
        {user && <span className={styles.userName}>{user.username}</span>}
        {user && <div className={styles.notifier}></div>}
      </Button>
    </div>
  );
}
