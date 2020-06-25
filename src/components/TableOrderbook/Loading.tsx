import React from 'react';
import styles from './TableOrderbook.module.scss';

export const Loading = React.memo(() => {
  return (
    <div className={`${styles.row} ${styles.loading}`}>
      <div>Loading...</div>
    </div>
  );
});
