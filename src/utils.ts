export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IOrderBookProps {
  asks: Array<[string, string]>;
  bids: Array<[string, string]>;
}

export const calculateTotalAmount = (array: Array<[string, string]>) =>
  array.length > 0
    ? array.reduce((prevValue, currentValue) => [
        (parseFloat(prevValue[0]) + parseFloat(currentValue[0])).toString(),
        (parseFloat(prevValue[1]) + parseFloat(currentValue[1])).toString(),
      ])
    : ['0', '0'];

export const sortArray = (array: Array<[string, string]>, sortDirection: SortDirection) => {
  return array.sort((a, b) =>
    sortDirection === SortDirection.DESC ? parseFloat(b[0]) - parseFloat(a[0]) : parseFloat(a[0]) - parseFloat(b[0]),
  );
};

export const generateUpdatedState = (
  prevState: Array<[string, string]>,
  updates: Array<[string, string]>,
  sortDirection: SortDirection = SortDirection.ASC,
) => {
  const newState = [...prevState];
  updates.forEach((update) => {
    const idx = newState.findIndex((state) => state[0] === update[0]);

    if (parseFloat(update[1]) === 0 && idx > -1) {
      newState.splice(idx, 1);
    } else if (idx > -1) {
      newState[idx] = update;
    } else {
      if (parseFloat(update[1]) !== 0) {
        newState.push(update);
      }
    }
  });
  sortArray(newState, sortDirection);
  return newState;
};
