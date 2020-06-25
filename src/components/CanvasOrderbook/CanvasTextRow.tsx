import React from 'react';
import { Text, Rect } from 'react-konva';

interface ITableRow {
  index: number;
  fillColor?: string;
  amount: string;
  price: string;
  totalAmount: number;
}

export const CanvasTextRow = React.memo(({ amount, price, index, fillColor = '#FFFFFF', totalAmount }: ITableRow) => {
  const filledArea = (0.03 + parseFloat(amount) / totalAmount) * 483;

  return (
    <>
      <Rect x={0} y={index * 20} width={filledArea} height={20} fill={fillColor} />
      <Text
        text={`${parseFloat(amount).toFixed(6)}`}
        fontSize={14}
        fontFamily="Segoe UI Semibold"
        height={20}
        width={164}
        y={index * 20}
        x={3}
        verticalAlign="middle"
        fontStyle="500"
        fill="gray"
      />
      <Text
        text={`${parseFloat(price).toFixed(2)}`}
        fontSize={14}
        fontFamily="Segoe UI Semibold"
        height={20}
        width={164}
        y={index * 20}
        x={164 - 3}
        align="right"
        verticalAlign="middle"
        fontStyle="500"
        fill="gray"
      />
      <Text
        text={`${(parseFloat(amount) * parseFloat(price)).toFixed(2)}`}
        fontSize={14}
        fontFamily="Segoe UI Semibold"
        height={20}
        width={164}
        y={index * 20}
        x={328 - 3}
        align="right"
        verticalAlign="middle"
        fontStyle="500"
        fill="gray"
      />
    </>
  );
});
