import React from 'react';
import { Text } from 'react-konva';

export const Loading = React.memo(() => {
  return (
    <Text
      text="Loading..."
      fontSize={14}
      fontFamily="Segoe UI Semibold"
      x={0}
      y={0}
      height={400}
      width={483}
      verticalAlign="middle"
      align="center"
      fontStyle="500"
      fill="gray"
    />
  );
});
