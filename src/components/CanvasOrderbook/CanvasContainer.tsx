import React, { useLayoutEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import styles from './CanvasOrderbook.module.scss';
import SimpleBar from 'simplebar-react';

export const CanvasContainer = React.memo(
  ({ children, height, reverse = false }: { children: React.ReactNode; height: number; reverse?: boolean }) => {
    const el = useRef(null);

    useLayoutEffect(() => {
      if (reverse && el.current) {
        // @ts-ignore
        el.current.contentWrapperEl.scrollTop = el.current!.contentWrapperEl.scrollHeight;
      }
    }, [reverse]);

    return (
      <div className={styles.container}>
        <SimpleBar autoHide={false} style={{ maxHeight: 400 }} ref={el}>
          <Stage width={489} height={height}>
            <Layer>{children}</Layer>
          </Stage>
        </SimpleBar>
      </div>
    );
  },
);
