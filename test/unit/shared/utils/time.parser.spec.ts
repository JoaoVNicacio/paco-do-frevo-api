import TimeParser from 'src/shared/utils/time.parser';

describe('TimeParser', () => {
  describe('fromSecondsToMilliseconds', () => {
    it('converts positive seconds to milliseconds', () => {
      expect(TimeParser.fromSecondsToMilliseconds(10)).toBe(10000);
    });

    it('converts negative seconds to positive milliseconds', () => {
      expect(TimeParser.fromSecondsToMilliseconds(-10)).toBe(10000);
    });
  });

  describe('fromMinutesToMilliseconds', () => {
    it('converts positive minutes to milliseconds', () => {
      expect(TimeParser.fromMinutesToMilliseconds(5)).toBe(300000);
    });

    it('converts negative minutes to positive milliseconds', () => {
      expect(TimeParser.fromMinutesToMilliseconds(-5)).toBe(300000);
    });
  });

  describe('fromHoursToMilliseconds', () => {
    it('converts positive hours to milliseconds', () => {
      expect(TimeParser.fromHoursToMilliseconds(2)).toBe(7200000);
    });

    it('converts negative hours to positive milliseconds', () => {
      expect(TimeParser.fromHoursToMilliseconds(-2)).toBe(7200000);
    });
  });

  describe('fromDaysToMilliseconds', () => {
    it('converts positive days to milliseconds', () => {
      expect(TimeParser.fromDaysToMilliseconds(1)).toBe(86400000);
    });

    it('converts negative days to positive milliseconds', () => {
      expect(TimeParser.fromDaysToMilliseconds(-1)).toBe(86400000);
    });
  });

  describe('fromMillisecondsToSeconds', () => {
    it('converts positive milliseconds to seconds', () => {
      expect(TimeParser.fromMillisecondsToSeconds(10000)).toBe(10);
    });

    it('converts negative milliseconds to positive seconds', () => {
      expect(TimeParser.fromMillisecondsToSeconds(-10000)).toBe(10);
    });
  });

  describe('fromMillisecondsToMinutes', () => {
    it('converts positive milliseconds to minutes', () => {
      expect(TimeParser.fromMillisecondsToMinutes(300000)).toBe(5);
    });

    it('converts negative milliseconds to positive minutes', () => {
      expect(TimeParser.fromMillisecondsToMinutes(-300000)).toBe(5);
    });
  });

  describe('fromMillisecondsToHours', () => {
    it('converts positive milliseconds to hours', () => {
      expect(TimeParser.fromMillisecondsToHours(7200000)).toBe(2);
    });

    it('converts negative milliseconds to positive hours', () => {
      expect(TimeParser.fromMillisecondsToHours(-7200000)).toBe(2);
    });
  });

  describe('fromMillisecondsToDays', () => {
    it('converts positive milliseconds to days', () => {
      expect(TimeParser.fromMillisecondsToDays(86400000)).toBe(1);
    });

    it('converts negative milliseconds to positive days', () => {
      expect(TimeParser.fromMillisecondsToDays(-86400000)).toBe(1);
    });
  });
});
