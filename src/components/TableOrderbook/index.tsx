import React, { useRef, useLayoutEffect, useState } from 'react';
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import { Divider } from '../Divider';
import { Loading } from './Loading';
import { TableRow } from './TableRow';
import styles from './TableOrderbook.module.scss';
import { IOrderBookProps, calculateTotalAmount } from 'src/utils';

export const TableOrderbook = ({ asks, bids }: IOrderBookProps) => {
  const totalAskAmount = calculateTotalAmount(asks);
  const totalBidAmount = calculateTotalAmount(bids);

  const [autoScroll, setAutoScroll] = useState(true);

  const el = useRef(null);

  useLayoutEffect(() => {
    if (el.current && autoScroll) {
      // @ts-ignore
      el.current.contentWrapperEl.scrollTop = el.current!.contentWrapperEl.scrollHeight;
    }
  }, [autoScroll, asks]);

  const renderAsks = asks
    .map((_, index, array) => array[array.length - 1 - index])
    .map((ask) => (
      <TableRow
        key={ask[0] + ask[1]}
        fillColor="#fae9f1"
        amount={ask[1]}
        price={ask[0]}
        totalAmount={parseFloat(totalAskAmount[1])}
      />
    ));

  const renderBids = bids.map((bid) => (
    <TableRow
      key={bid[0] + bid[1]}
      fillColor="#f0f6e5"
      amount={bid[1]}
      price={bid[0]}
      totalAmount={parseFloat(totalBidAmount[1])}
    />
  ));

  return (
    <div className={styles.tableOrderbook}>
      <div className={`${styles.bookContainer} ${styles.asks}`}>
        <div className={styles.bookHead}>
          <div className={styles.row}>
            <div>Amount</div>
            <div className={styles['text-right']}>Price</div>
            <div className={styles['text-right']}>Total</div>
          </div>
        </div>
        <SimpleBar
          autoHide={false}
          style={{ maxHeight: 400 }}
          ref={el}
          onScroll={() => {
            // @ts-ignore
            const contentEl = el.current.contentWrapperEl;
            const offset = contentEl.scrollHeight - contentEl.scrollTop - contentEl.offsetHeight;
            if (offset <= 10 && !autoScroll) {
              setAutoScroll(true);
            } else if (offset > 10 && autoScroll) {
              setAutoScroll(false);
            }
          }}
        >
          <div className={styles.bookBody}>{renderAsks.length > 0 ? renderAsks : <Loading />}</div>
        </SimpleBar>
      </div>
      <Divider />
      <div className={styles.bookContainer}>
        <SimpleBar autoHide={false} style={{ maxHeight: 400 }}>
          <div className={styles.bookBody}>{renderBids.length > 0 ? renderBids : <Loading />}</div>
        </SimpleBar>
      </div>
    </div>
  );
};
