export function padNumber(number: string | number, length: number): string {
  let string = number.toString();

  while (string.length < length) {
    string = '0' + string;
  }

  return string;
}

export function getTimeString(totalMiliseconds: number): string {
  const totalSeconds = Math.floor(totalMiliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  const miliseconds = totalMiliseconds % 1000;
  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours % 60;

  const milisecondsString = padNumber(miliseconds, 3);
  const secondsString = padNumber(seconds, 2);
  const minutesString = padNumber(minutes, 2);
  const hoursString = padNumber(hours, 2);

  return `${hoursString}:${minutesString}:${secondsString}.${milisecondsString}`;
}

export function getCurrentDateString(date: Date): string {
  const day = padNumber(date.getDate(), 2);
  const month = padNumber(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  return `${year}.${month}.${day}`;
}

export function getCurrentTimeString(date: Date): string {
  const hours = padNumber(date.getHours(), 2);
  const minutes = padNumber(date.getMinutes(), 2);
  const seconds = padNumber(date.getSeconds(), 2);

  return `${hours}:${minutes}:${seconds}`;
}

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