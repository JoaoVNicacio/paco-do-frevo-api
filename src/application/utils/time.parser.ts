/**
 * The `TimeParser` class provides methods to convert time units between:
 * `seconds`, `minutes`, `hours`, `days` and `milliseconds`,
 * handling negative values by parsing them to their positive equivalents.
 */
class TimeParser {
  /**
   * Converts seconds to milliseconds.
   * @override → if the value is negative it will be parsed to its positive.
   * @param seconds The number of seconds to convert.
   * @returns The equivalent milliseconds.
   */
  public static fromSecondsToMilliseconds(seconds: number): number {
    return seconds < 0 ? seconds * -1000 : seconds * 1000;
  }

  /**
   * Converts minutes to milliseconds.
   * @override → if the value is negative it will be parsed to its positive.
   * @param minutes The number of minutes to convert.
   * @returns The equivalent milliseconds.
   */
  public static fromMinutesToMilliseconds(minutes: number): number {
    return minutes < 0 ? minutes * -60 * 1000 : minutes * 60 * 1000;
  }

  /**
   * Converts hours to milliseconds.
   * @override → if the value is negative it will be parsed to its positive.
   * @param hours The number of hours to convert.
   * @returns The equivalent milliseconds.
   */
  public static fromHoursToMilliseconds(hours: number): number {
    return hours < 0 ? hours * -60 * 60 * 1000 : hours * 60 * 60 * 1000;
  }

  /**
   * Converts days to milliseconds.
   * @override → if the value is negative it will be parsed to its positive.
   * @param days The number of days to convert.
   * @returns The equivalent milliseconds.
   */
  public static fromDaysToMilliseconds(days: number): number {
    return days < 0 ? days * -24 * 60 * 60 * 1000 : days * 24 * 60 * 60 * 1000;
  }

  /**
   * Converts milliseconds to seconds.
   * @override → if the value is negative it will be parsed to its positive.
   * @param milliseconds The number of milliseconds to convert.
   * @returns The equivalent seconds.
   */
  public static fromMillisecondsToSeconds(milliseconds: number): number {
    return milliseconds < 0 ? milliseconds / -1000 : milliseconds / 1000;
  }

  /**
   * Converts milliseconds to minutes.
   * @override → if the value is negative it will be parsed to its positive.
   * @param milliseconds The number of milliseconds to convert.
   * @returns The equivalent minutes.
   */
  public static fromMillisecondsToMinutes(milliseconds: number): number {
    return milliseconds < 0
      ? milliseconds / -(60 * 1000)
      : milliseconds / (60 * 1000);
  }

  /**
   * Converts milliseconds to hours.
   * @override → if the value is negative it will be parsed to its positive.
   * @param milliseconds The number of milliseconds to convert.
   * @returns The equivalent hours.
   */
  public static fromMillisecondsToHours(milliseconds: number): number {
    return milliseconds < 0
      ? milliseconds / -(60 * 60 * 1000)
      : milliseconds / (60 * 60 * 1000);
  }

  /**
   * Converts milliseconds to days.
   * @override → if the value is negative it will be parsed to its positive.
   * @param milliseconds The number of milliseconds to convert.
   * @returns The equivalent days.
   */
  public static fromMillisecondsToDays(milliseconds: number): number {
    return milliseconds < 0
      ? milliseconds / -(24 * 60 * 60 * 1000)
      : milliseconds / (24 * 60 * 60 * 1000);
  }
}

export default TimeParser;
