export function padNumber(number, size) {
  let string = number.toString();

  while (string.length < size) {
    string = '0' + string;
  }

  return string;
}