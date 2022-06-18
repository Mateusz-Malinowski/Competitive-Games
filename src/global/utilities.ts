export function padNumber(number: number, length: number): string {
  let string = number.toString();

  if (number < 0)
    while (string.length < length + 1)
      string = string.slice(0, 1) + '0' + string.slice(1);
  else
    while (string.length < length)
      string = '0' + string;

  return string;
}

export function getTimeString(totalMiliseconds: number): string {
  const totalSeconds = Math.floor(Math.abs(totalMiliseconds) / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const miliseconds = Math.abs(totalMiliseconds) % 1000;
  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours % 60;
  const milisecondsString = padNumber(miliseconds, 3);
  const secondsString = padNumber(seconds, 2);
  const minutesString = padNumber(minutes, 2);
  const hoursString = padNumber(hours, 2);

  return `${totalMiliseconds < 0 ? '-' : ''}${hoursString}:${minutesString}:${secondsString}.${milisecondsString}`;
}

export function getCurrentDateString(date: Date, separator: string = '.'): string {
  const day = padNumber(date.getDate(), 2);
  const month = padNumber(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  return `${year}${separator}${month}${separator}${day}`;
}

export function getCurrentTimeString(date: Date, separator: string = ':'): string {
  const hours = padNumber(date.getHours(), 2);
  const minutes = padNumber(date.getMinutes(), 2);
  const seconds = padNumber(date.getSeconds(), 2);

  return `${hours}${separator}${minutes}${separator}${seconds}`;
}

/**
 * Removes provided element from an array. Only the first encountered element is removed.
 * 
 * @param array array to be modified
 * @param element element to be removed
 */
export function removeElementFromArray<T>(array: Array<T>, element: T): void {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

/**
 * 
 * @param min minimum value
 * @param max maximum value
 * @returns a number in <min, max)
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function initialize2dArray<T>(initValue: T, numberOfRows: number, numberOfColumns: number): T[][] {
  const array: T[][] = [];

  for (let i = 0; i < numberOfRows; i++) {
    array.push([]);
    for (let j = 0; j < numberOfColumns; j++) {
      array[i][j] = initValue;
    }
  }

  return array;
}

/**
 * T can be a enumerable or an object containing ONLY enumerable properties
 * 
 * @param array 2d array to be copied
 * @returns 
 */
export function deepCopy2dArray<T>(array: T[][]): T[][] {
  const newArray: T[][] = [];

  for (let i = 0; i < array.length; i++) {
    newArray.push([]);
    for (let j = 0; j < array[i].length; j++) {
      const oldValue = array[i][j];

      if ( // is object
        typeof oldValue === 'object' &&
        !Array.isArray(oldValue) &&
        oldValue !== null
      )
        newArray[i][j] = Object.assign({}, oldValue);

      else // enumerable
        newArray[i][j] = array[i][j];
    }
  }

  return newArray;
}