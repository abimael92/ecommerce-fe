import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import { Account } from '../Account';
import { Menu } from '../Menu';
import LogoTitle from '@/components/Layout/LogoTitle';
import styles from './TopBar.module.scss';

export function TopBar(props) {
  const { isOpenSearch } = props;

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <LogoTitle size="SMALL" />
      </div>

      <div className={styles.center}>
        <Menu isOpenSearch={isOpenSearch} />
      </div>

      <div className={styles.right}>
        <Account />
      </div>
    </div>
  );
}
