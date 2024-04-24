import React from 'react';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import styles from './LogoTitle.module.scss';

const SIZES = {
  BIG: 320,
  MEDIUM: 160,
  SMALL: 80,
};

const LogoTitle = ({ size }) => {
  const imgGame = SIZES[size] || SIZES.MEDIUM; // Default to MEDIUM if size is invalid
  const imgGaming = Math.floor(imgGame * 0.7);

  return (
    <div className={styles.logoTitle}>
      <Link href="/">

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image src="/images/gamingCtrl.png" alt="Game" height={imgGame} />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/gaming_title.png"
              alt="Gaming"
              height={imgGaming}
            />
          </div>
        </div>
      </Link >
    </div >
  );
};

export default LogoTitle;
