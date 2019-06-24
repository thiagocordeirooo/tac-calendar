import { Component, Input } from "@angular/core";
import { isToday } from "date-fns";

import { TacCalendarUtils } from "../common/tac-calendar-utils";
import { OptionsSchedule } from "../common/options-schedule";

interface CalendarWeek {
  date: Date;
  hours: Date[];
}

@Component({
  selector: "app-week",
  templateUrl: "./week.component.html",
  styleUrls: ["./week.component.scss"]
})
export class WeekComponent {
  public daysOfweek: CalendarWeek[] = [];

  public isToday = isToday;

  public selectedHour: Date;

  @Input()
  public set baseDate(v: Date) {
    if (v) {
      this.getDaysOfWeek(v);
    }
  }

  @Input()
  public optionsSchedule: OptionsSchedule = {
    startInterval: 480,
    endInterval: 720,
    interval: 15
  };

  private getDaysOfWeek(date: Date) {
    this.daysOfweek = [];
    const week: Date[] = TacCalendarUtils.getDaysOfWeek(date);

    const { startInterval, endInterval, interval } = this.optionsSchedule;

    week.forEach(day => {
      const dayOfweek: CalendarWeek = {
        date: day,
        hours: TacCalendarUtils.getHoursOfDay(
          day,
          startInterval,
          endInterval,
          interval
        )
      };

      this.daysOfweek.push(dayOfweek);
    });
  }

  public selectHour = (hour: Date) => (this.selectedHour = hour);
}
