/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(
  source: readonly T[],
  mapper: (item: T, index: number) => R,
): R[] {
  if (source === null || source === undefined) {
    throw new TypeError("Source cannot be null or undefined");
  }
  const newArray = [];
  for (let i = 0; i < source.length; i++) {
    const element = mapper(source[i], i);
    newArray.push(element);
  }

  return newArray;
}

export function filterArray<T>(
  source: readonly T[],
  predicate: (item: T, index: number) => boolean,
): T[] {
  if (source === null || source === undefined) {
    throw new TypeError("Source cannot be null or undefined");
  }
  const newArray = [];
  for (let i = 0; i < source.length; i++) {
    const element = source[i];
    if (predicate(element, i)) newArray.push(element);
  }
  return newArray;
}

export function reduceArray<T, R>(
  source: readonly T[],
  reducer: (acc: R, item: T, index: number) => R,
  initial: R,
): R {
  if (source === null || source === undefined) {
    throw new TypeError("Source cannot be null or undefined");
  }

  let accumulator = initial;
  for (let i = 0; i < source.length; i++) {
    const element = source[i];
    accumulator = reducer(accumulator, element, i);
  }

  return accumulator;
}

export function partition<T>(
  source: readonly T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  if (source === null || source === undefined) {
    throw new TypeError("Source cannot be null or undefined");
  }
  const passArray: T[] = [];
  const failArray: T[] = [];
  for (let i = 0; i < source.length; i++) {
    const element = source[i];
    if (predicate(element)) {
      passArray.push(element);
    } else {
      failArray.push(element);
    }
  }
  return [passArray, failArray];
}

export function groupBy<T, K extends PropertyKey>(
  source: readonly T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  if (source === null || source === undefined) {
    throw new TypeError("Source cannot be null or undefined");
  }
  const acc = {} as Record<K, T[]>;
  for (let i = 0; i < source.length; i++) {
    const element = source[i];
    const key = keySelector(element);

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(element);
  }
  return acc;
}
