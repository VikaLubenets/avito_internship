import { chunkArray } from './chunkArray';

describe('chunkArray', () => {
  it('splits an array into chunks of the specified size', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const size = 3;
    const expected: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = chunkArray(array, size);
    expect(result).toEqual(expected);
  });

  it('returns an empty array when the input array is empty', () => {
    const array: number[] = [];
    const size = 3;
    const expected: number[][] = [];
    const result = chunkArray(array, size);
    expect(result).toEqual(expected);
  });

  it('returns the original array wrapped in a single chunk if size is greater than or equal to the length of the array', () => {
    const array = [1, 2, 3];
    const size = 5;
    const expected = [[1, 2, 3]];
    const result = chunkArray(array, size);
    expect(result).toEqual(expected);
  });

  it('handles arrays with different types of elements', () => {
    const array = [1, 'a', true, { key: 'value' }, [5, 6]];
    const size = 2;
    const expected = [[1, 'a'], [true, { key: 'value' }], [[5, 6]]];
    const result = chunkArray(array, size);
    expect(result).toEqual(expected);
  });

  it('handles cases where the last chunk may have fewer elements than the specified size', () => {
    const array = [1, 2, 3, 4, 5];
    const size = 2;
    const expected = [[1, 2], [3, 4], [5]];
    const result = chunkArray(array, size);
    expect(result).toEqual(expected);
  });
});
