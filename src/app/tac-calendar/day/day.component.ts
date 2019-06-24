import { Component, Input } from "@angular/core";
import { isToday } from "date-fns";

import { TacCalendarUtils } from "../common/tac-calendar-utils";
import { OptionsSchedule } from "../common/options-schedule";

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html",
  styleUrls: ["./day.component.scss"]
})
export class DayComponent {
  public hoursOfDay: Date[] = [];

  @Input()
  public set baseDate(v: Date) {
    if (v) {
      this._baseDate = v;

      const { startInterval, endInterval, interval } = this.optionsSchedule;
      this.hoursOfDay = TacCalendarUtils.getHoursOfDay(
        v,
        startInterval,
        endInterval,
        interval
      );
    }
  }

  public get baseDate(): Date {
    return this._baseDate;
  }
  private _baseDate: Date;

  @Input()
  public optionsSchedule: OptionsSchedule = {
    startInterval: 480,
    endInterval: 720,
    interval: 10
  };

  public isToday = isToday;
}
