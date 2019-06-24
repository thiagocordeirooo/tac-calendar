import { Component, EventEmitter, Input, Output } from "@angular/core";
import { getMonth, isToday, isWeekend } from "date-fns";
import { TacCalendarUtils } from "../common/tac-calendar-utils";

@Component({
  selector: "app-mini-month",
  templateUrl: "./mini-month.component.html",
  styleUrls: ["./mini-month.component.scss"]
})
export class MiniMonthComponent {
  public DAYS_OF_WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];

  public weeks: Date[] = [];

  private _month: Date;
  public get month(): Date {
    return this._month;
  }

  @Input()
  public set month(v: Date) {
    this._month = v;

    this.weeks = TacCalendarUtils.getWeeksOfMonth(v, { forceSixRows: true });
  }

  @Input()
  public showLabelMonth: boolean = true;

  @Output()
  public onClickDay = new EventEmitter<any>();

  public isWeekend = isWeekend;
  public isToday = isToday;
  public getMonth = getMonth;
}
