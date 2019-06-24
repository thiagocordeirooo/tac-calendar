import {
  getDaysInMonth,
  startOfWeek,
  addDays,
  startOfDay,
  addMinutes,
  endOfDay
} from "date-fns";

export abstract class TacCalendarUtils {
  static DAYS_IN_WEEK = 7;
  static START_OF_WEEK = 0;

  private static cloneDate = (date: Date) => new Date(date.getTime());

  private static getDaysAllOfMonth(date: Date) {
    const daysInMonth = getDaysInMonth(date);
    const days = [];
    for (let index = 1; index <= daysInMonth; index++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), index));
    }
    return days;
  }

  public static getWeeksOfMonth(
    date: Date,
    { firstDayOfWeek = 0, forceSixRows = false } = {}
  ): Date[] {
    let days = this.getDaysAllOfMonth(date);
    let daysInMonth = days.length;
    let week = [];
    let weeks = [];

    // build weeks array
    days.forEach(day => {
      if (week.length > 0 && day.getDay() === firstDayOfWeek) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
      if (days.indexOf(day) === days.length - 1) {
        weeks.push(week);
      }
    });

    // unshift days to start the first week
    const firstWeek = weeks[0];
    for (let index = this.DAYS_IN_WEEK - firstWeek.length; index > 0; index--) {
      const outsideDate = this.cloneDate(firstWeek[0]);
      outsideDate.setDate(firstWeek[0].getDate() - 1);
      firstWeek.unshift(outsideDate);
      daysInMonth++;
    }

    // push days until the end of the last week
    const lastWeek = weeks[weeks.length - 1];
    for (let index = lastWeek.length; index < this.DAYS_IN_WEEK; index++) {
      const outsideDate = this.cloneDate(lastWeek[lastWeek.length - 1]);
      outsideDate.setDate(lastWeek[lastWeek.length - 1].getDate() + 1);
      lastWeek.push(outsideDate);
      daysInMonth++;
    }

    // handle six rows if we need to
    if (forceSixRows && daysInMonth < 42) {
      let lastDayOfMonth = weeks[weeks.length - 1][6];
      let lastWeek = [];
      let index = 1;
      while (daysInMonth < 42) {
        let lastDayOfMonthClone = this.cloneDate(lastDayOfMonth);
        let day = new Date(
          lastDayOfMonthClone.setDate(lastDayOfMonthClone.getDate() + index)
        );
        if (lastWeek.length > 0 && day.getDay() === firstDayOfWeek) {
          weeks.push(lastWeek);
          lastWeek = [];
        }
        lastWeek.push(day);
        daysInMonth++;
        index++;
      }
      // push last week after finishing loop
      weeks.push(lastWeek);
    }

    return weeks;
  }

  public static getDaysOfWeek(date: Date): Date[] {
    let startDay = startOfWeek(date);
    startDay = addDays(startDay, this.START_OF_WEEK);

    const days = [startDay];

    for (let index = 1; index < this.DAYS_IN_WEEK; index++) {
      days.push(addDays(startDay, index));
    }

    return days;
  }

  public static getHoursOfDay(
    day: Date,
    startInterval: number,
    endInterval: number,
    interval: number
  ): Date[] {
    const hoursResult: Date[] = [];

    let startHour = startOfDay(day);
    startHour = addMinutes(startHour, startInterval - interval);

    const endHour = addMinutes(startOfDay(day), endInterval);

    for (let index = interval; ; index = index + interval) {
      const newHour = addMinutes(startHour, index);
      if (newHour >= endHour || newHour > endOfDay(day)) {
        if (newHour > endHour) hoursResult.pop();

        break;
      }

      hoursResult.push(newHour);
    }

    return hoursResult;
  }
}
