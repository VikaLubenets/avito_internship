export function chunkArray<T>(array: Array<T>, size: number): Array<Array<T>> {
  const chunkedArray: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}