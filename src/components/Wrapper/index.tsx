import React from 'react';
import { TableOrderbook } from '../TableOrderbook';
import { CanvasOrderbook } from '../CanvasOrderbook';
import { useFetchOrderBook } from 'src/hooks/fetchOrderBook';

export const Wrapper = () => {
  const { asks, bids } = useFetchOrderBook();

  return (
    <>
      <TableOrderbook asks={asks} bids={bids} />
      <CanvasOrderbook asks={asks} bids={bids} />
    </>
  );
};
