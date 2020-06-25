import React from 'react';
import styles from './TableOrderbook.module.scss';

interface ITableRow {
  fillColor?: string;
  amount: string;
  price: string;
  totalAmount: number;
}

export const TableRow = React.memo(({ amount, price, totalAmount, fillColor = '#FFFFFF' }: ITableRow) => {
  const filledArea = (parseFloat(amount) / totalAmount) * 100;
  return (
    <div
      className={styles.row}
      style={{ background: `linear-gradient(90deg, ${fillColor} ${3 + filledArea}%, #FFFFFF ${3 + filledArea}%)` }}
    >
      <div>{parseFloat(amount).toFixed(6)}</div>
      <div className={styles['text-right']}>{parseFloat(price).toFixed(2)}</div>
      <div className={styles.value}>{(parseFloat(amount) * parseFloat(price)).toFixed(2)}</div>
    </div>
  );
});
