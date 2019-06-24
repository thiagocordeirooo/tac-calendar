import { Component, EventEmitter, Input, Output } from "@angular/core";
import { getMonth, isToday, isWeekend } from "date-fns";
import { TacCalendarUtils } from "../common/tac-calendar-utils";

@Component({
  selector: "app-month",
  templateUrl: "./month.component.html",
  styleUrls: ["./month.component.scss"]
})
export class MonthComponent {
  public DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Quin", "Sex", "Sáb"];

  @Input()
  public set baseDate(v: Date) {
    if (v) {
      this.weeks = TacCalendarUtils.getWeeksOfMonth(v, { forceSixRows: true });
    }

    this._baseDate = v;
  }

  public get baseDate(): Date {
    return this._baseDate;
  }
  private _baseDate: Date;

  @Output()
  public prev: EventEmitter<any> = new EventEmitter();
  @Output()
  public next: EventEmitter<any> = new EventEmitter();

  @Output()
  public onClickDay = new EventEmitter<any>();

  public isWeekend = isWeekend;
  public isToday = isToday;
  public getMonth = getMonth;

  public daysOfMonth = [];
  public weeks = [];

  public selectedDay = new Date();

  public selectDay(day: Date) {
    this.selectedDay = day;
    if (getMonth(day) !== getMonth(this.baseDate)) {
      if (day.getTime() < this.baseDate.getTime()) {
        this.prev.emit();
      } else if (day.getTime() > this.baseDate.getTime()) {
        this.next.emit();
      }
    }
  }

  public dblclickDay(day: Date) {
    if (!isWeekend(day) && getMonth(day) === getMonth(this.baseDate)) {
      const result = prompt(`Day ${day.toLocaleDateString()} clicked!`);

      console.log("result: ", result);
    } else if (isWeekend(day)) {
      alert(`Sorry, ${day.toLocaleDateString()} is weekend!`);
    }
  }
}
