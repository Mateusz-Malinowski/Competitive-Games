export function padNumber(number: string | number, length: number) {
  let string = number.toString();

  while (string.length < length) {
    string = '0' + string;
  }

  return string;
}

export function getCurrentDateString(date: Date) {
  const day = padNumber(date.getDate(), 2);
  const month = padNumber(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  return `${year}.${month}.${day}`;
}

export function getCurrentTimeString(date: Date) {
  const hours = padNumber(date.getHours(), 2);
  const minutes = padNumber(date.getMinutes(), 2);
  const seconds = padNumber(date.getSeconds(), 2);

  return `${hours}:${minutes}:${seconds}`;
}

export function removeElementFromArray<T>(array: Array<T>, element: T) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}