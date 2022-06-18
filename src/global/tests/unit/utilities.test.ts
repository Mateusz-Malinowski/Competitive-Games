import { deepCopy2dArray, getCurrentDateString, getCurrentTimeString, getRandomInt, getTimeString, initialize2dArray, padNumber, removeElementFromArray } from "../../utilities";

describe('padNumber()', () => {
  test('Padding positive number', () => {
    expect(padNumber(2, 2)).toBe('02');
    expect(padNumber(2.2, 4)).toBe('02.2');
  });

  test('Padding negative number', () => {
    expect(padNumber(-1, 3)).toBe('-001');
    expect(padNumber(-5.2, 4)).toBe('-05.2');
  });

  test('Padding 0', () => {
    expect(padNumber(0, 4)).toBe('0000');
    expect(padNumber(0.00, 4)).toBe('0000');
  });
});

describe('getTimeString()', () => {
  test('Getting time string from positive number of miliseconds', () => {
    expect(getTimeString(200202010)).toBe('55:36:42.010');
  });

  test('Getting time string from negative number of miliseconds', () => {
    expect(getTimeString(-200202030)).toBe('-55:36:42.030');
  });

  test('Getting time string from 0 as number of miliseconds', () => {
    expect(getTimeString(0)).toBe('00:00:00.000');
  });
});

describe('getCurrentDateString()', () => {
  describe('Current day is 2022-06-18', () => {
    const date = new Date(2022, 5, 18);

    test('Getting date string with default separator', () => {
      expect(getCurrentDateString(date)).toBe('2022.06.18');
    });

    test('Getting date string with explicit separator', () => {
      expect(getCurrentDateString(date, '-')).toBe('2022-06-18');
    });
  });

  describe('Current day is 2003-04-03', () => {
    const date = new Date(2003, 3, 3);

    test('Getting date string with default separator', () => {
      expect(getCurrentDateString(date)).toBe('2003.04.03');
    });

    test('Getting date string with explicit separator', () => {
      expect(getCurrentDateString(date, '-')).toBe('2003-04-03');
    });
  });
});

describe('getCurrentTimeString()', () => {
  describe('Current time is 21:37:00', () => {
    const date = new Date();
    date.setHours(21, 37, 0);

    test('Getting time string with default separator', () => {
      expect(getCurrentTimeString(date)).toBe('21:37:00');
    });

    test('Getting time string with explicit separator', () => {
      expect(getCurrentTimeString(date, '.')).toBe('21.37.00');
    });
  });

  describe('Current time is 04:20:30', () => {
    const date = new Date();
    date.setHours(4, 20, 30);

    test('Getting time string with default separator', () => {
      expect(getCurrentTimeString(date)).toBe('04:20:30');
    });

    test('Getting time string with explicit separator', () => {
      expect(getCurrentTimeString(date, '.')).toBe('04.20.30');
    });
  });
});

describe('removeElementFromArray()', () => {
  test('Removing element from array of numbers', () => {
    const array: number[] = [-2, 3, 7];

    removeElementFromArray(array, 3);
    expect(array).toEqual([-2, 7]);
  });

  test('Removing element from array of strings', () => {
    const array: string[] = ['milk', 'bread', 'milk', 'water', 'orange juice'];

    removeElementFromArray(array, 'milk');
    expect(array).toEqual(['bread', 'milk', 'water', 'orange juice']);
  });

  test('Removing element from array of objects', () => {
    const bookA = { title: 'abc', description: 'abc' };
    const bookB = { title: '123', description: '123' };
    const array = [bookA, bookB];

    removeElementFromArray(array, bookA);
    expect(array).toEqual([bookB]);
  });
});

describe('getRandomInt()', () => {
  test('Getting int from <1, 2) range', () => {
    expect(getRandomInt(1, 2)).toBe(1);
  });

  test('Getting int from <-2, -1) range', () => {
    expect(getRandomInt(-2, -1)).toBe(-2);
  });
});

describe('initialize2dArray', () => {
  test('Initializing 2d array of numbers', () => {
    expect(initialize2dArray(0, 2, 2)).toEqual([[0, 0], [0, 0]]);
  });

  test('Initializing 2d array of strings', () => {
    expect(initialize2dArray('abc', 2, 2)).toEqual([['abc', 'abc'], ['abc', 'abc']]);
  });

  test('Initializing 2d array of objects', () => {
    expect(initialize2dArray({ prop: 0 }, 2, 2)).toEqual([[{ prop: 0 }, { prop: 0 }], [{ prop: 0 }, { prop: 0 }]]);
  });
});

describe('deepCopy2dArray()', () => {
  test('Deep copying 2d array of numbers', () => {
    const array = [[1, 2], [3, 4]];
    const deepCopy = deepCopy2dArray(array);

    expect(deepCopy).toEqual(array);
    expect(deepCopy).not.toBe(array);
  });

  test('Deep copying 2d array of strings', () => {
    const array = [['a', 'b'], ['c', 'd']];
    const deepCopy = deepCopy2dArray(array);

    expect(deepCopy).toEqual(array);
    expect(deepCopy).not.toBe(array);
  });

  test('Deep copying 2d array of objects', () => {
    const bookA = { title: 'abc', description: 'abc' };
    const bookB = { title: '123', description: '123' };
    const array = [[bookA], [bookB]];
    const deepCopy = deepCopy2dArray(array);

    expect(deepCopy).toEqual(array);
    expect(deepCopy).not.toBe(array);
    expect(deepCopy[0]).not.toBe(bookA);
    expect(deepCopy[1]).not.toBe(bookB);
  });
});

