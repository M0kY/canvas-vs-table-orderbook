import React from 'react';
import styles from './CanvasOrderbook.module.scss';
import { calculateTotalAmount, IOrderBookProps } from 'src/utils';
import { Divider } from '../Divider';
import { CanvasTextRow } from './CanvasTextRow';
import { CanvasContainer } from './CanvasContainer';
import { Loading } from './Loading';

export const CanvasOrderbook = ({ asks, bids }: IOrderBookProps) => {
  const totalAskAmount = calculateTotalAmount(asks);
  const totalBidAmount = calculateTotalAmount(bids);

  const renderAsks = asks
    .map((_, index, array) => array[array.length - 1 - index])
    .map((ask, index) => (
      <CanvasTextRow
        key={ask[0] + ask[1]}
        fillColor="#fae9f1"
        amount={ask[1]}
        price={ask[0]}
        totalAmount={parseFloat(totalAskAmount[1])}
        index={index}
      />
    ));

  const renderBids = bids.map((bid, index) => (
    <CanvasTextRow
      key={bid[0] + bid[1]}
      fillColor="#f0f6e5"
      amount={bid[1]}
      price={bid[0]}
      totalAmount={parseFloat(totalBidAmount[1])}
      index={index}
    />
  ));

  return (
    <div className={styles.canvasOrderbook}>
      <div className={`${styles.bookContainer} ${styles.asks}`}>
        <div className={styles.bookHead}>
          <div className={styles.row}>
            <div>Amount</div>
            <div className={styles['text-right']}>Price</div>
            <div className={styles['text-right']}>Total</div>
          </div>
        </div>
      </div>
      {renderAsks.length > 0 ? (
        <CanvasContainer height={asks.length * 20 || 400} reverse>
          {renderAsks}
        </CanvasContainer>
      ) : (
        <CanvasContainer height={400}>
          <Loading />
        </CanvasContainer>
      )}
      <Divider />
      <CanvasContainer height={bids.length * 20 || 400}>
        {renderBids.length > 0 ? renderBids : <Loading />}
      </CanvasContainer>
    </div>
  );
};
