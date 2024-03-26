import React from 'react';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import styles from './LogoTitle.module.scss';

const LogoTitle = ({ size }) => {
  const imgGame =
    {
      BIG: 80,
      MEDIUM: 45,
      SMALL: 25,
    }[size] || 45; // Default to MEDIUM if size is invalid
  const imgGaming = Math.floor(imageSize * 0.7);

  return (
    <Link href="/">
      <a className={styles.logoTitle}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image src="/images/logo.png" alt="Game" height={imgGame} />
          </div>
          <div className={styles.imageWrapper}>
            <Image src="/images/gaming.png" alt="Gaming" height={imgGaming} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LogoTitle;
