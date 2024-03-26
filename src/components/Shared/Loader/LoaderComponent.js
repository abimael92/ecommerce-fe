import React from 'react';
import { Dimmer } from 'semantic-ui-react';
import styles from './LoaderComponent.module.scss';

const LoaderComponent = ({ active, secondaryText }) => {
  return (
    <Dimmer active={active} className={styles.loader} inverted page>
      <div className={styles.loaderContainer}>
        <h1 className={styles.loadingTextPrimary}>Game On!</h1>
        <img
          src="/images/loading.gif"
          alt="Loading"
          className={styles.animatedLoader}
        />
        {secondaryText && (
          <div className={styles.loadingTextContainer}>
            <span className={styles.loadingTextSecondary}>{secondaryText}</span>
          </div>
        )}
      </div>
    </Dimmer>
  );
};

export default LoaderComponent;
