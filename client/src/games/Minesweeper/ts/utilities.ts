export function padNumber(number: string | number, length: number) {
  let string = number.toString();

  while (string.length < length) {
    string = '0' + string;
  }

  return string;
}