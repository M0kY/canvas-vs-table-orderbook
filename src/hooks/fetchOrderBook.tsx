import { useEffect, useRef, useState } from 'react';
import { sortArray, generateUpdatedState, SortDirection } from 'src/utils';

interface IOrderbookSnapshot {
  E: number;
  T: number;
  asks: Array<[string, string]>;
  bids: Array<[string, string]>;
  lastUpdateId: number;
}

interface IDepthMessage {
  stream: string;
  e: string;
  E: number;
  T: number;
  s: string;
  U: number;
  u: number;
  pu: number;
  b: Array<[string, string]>;
  a: Array<[string, string]>;
}

// interface IDepthLoad {
//   lastUpdateId: number;
//   loaded: boolean;
// }

export const useFetchOrderBook = (limit: number = 100) => {
  const [bookState, setBookState] = useState<IOrderbookSnapshot | null>(null);
  const marketDepthSocket = useRef<WebSocket>();
  const bufferedBook = useRef<IDepthMessage[]>([]);
  const depthLoaded = useRef<IOrderbookSnapshot>();

  useEffect(() => {
    marketDepthSocket.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');
    marketDepthSocket.current.onopen = () => {
      if (marketDepthSocket.current && marketDepthSocket.current.readyState === 1) {
        (async () => {
          const res = await fetch('https://www.binance.com/api/v1/depth?symbol=BTCUSDT&limit=1000');
          const data = await res.json();

          let asks = sortArray(data.asks, SortDirection.ASC);
          let bids = sortArray(data.bids, SortDirection.DESC);

          bufferedBook.current.forEach((message) => {
            if (message.u > data.lastUpdateId) {
              asks = generateUpdatedState(asks, message.a);
              bids = generateUpdatedState(bids, message.b, SortDirection.DESC);
            }
          });
          bufferedBook.current = [];

          setBookState({
            ...data,
            asks,
            bids,
          });
        })();
      }
    };

    marketDepthSocket.current.onmessage = (message) => {
      const messageData = JSON.parse(message.data);
      if (depthLoaded.current) {
        // Edit book
        const newAsks = generateUpdatedState(
          depthLoaded.current?.asks ? [...depthLoaded.current.asks] : [],
          messageData.a,
        );
        const newBids = generateUpdatedState(
          depthLoaded.current?.bids ? [...depthLoaded.current.bids] : [],
          messageData.b,
          SortDirection.DESC,
        );

        setBookState((prevState) => ({ ...prevState!, asks: newAsks, bids: newBids }));
      } else {
        // Buffer for later update
        bufferedBook.current.push(messageData);
      }
    };

    marketDepthSocket.current.onerror = (error) => {
      console.log(error);
    };

    return () => {
      if (marketDepthSocket.current) {
        marketDepthSocket.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (bookState) {
      depthLoaded.current = bookState;
    }
  }, [bookState]);

  return { bids: bookState?.bids.slice(0, limit) || [], asks: bookState?.asks.slice(0, limit) || [] };
};
