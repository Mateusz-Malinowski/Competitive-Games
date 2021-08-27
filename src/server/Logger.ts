import { getCurrentDateString, getCurrentTimeString } from '../global/utilities';
import colors from 'colors';

export default class Logger {
  private static getDateAndTimeString(): string {
    const date = new Date();
    const dateString = getCurrentDateString(date);
    const timeString = getCurrentTimeString(date);

    return colors.grey(`[${dateString} - ${timeString}]`);
  }

  public static info = (message: any): void => {
    console.log(Logger.getDateAndTimeString(), message);
  }

  public static warn = (message: any): void => {
    console.log(Logger.getDateAndTimeString(), colors.yellow(message));
  }

  public static error = (message: any): void => {
    console.log(Logger.getDateAndTimeString(), colors.red(message));
  }

  public static debug = (message: any): void => {
    console.log(Logger.getDateAndTimeString(), colors.blue(message));
  }
}
