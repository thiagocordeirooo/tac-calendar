import { Component, HostListener } from "@angular/core";

import {
  addMonths,
  addWeeks,
  startOfWeek,
  endOfWeek,
  addDays,
  addYears
} from "date-fns";
import { DatePipe } from "@angular/common";
import { OptionsSchedule } from "./common/options-schedule";

type ViewType = "year" | "month" | "week" | "day";

@Component({
  selector: "tac-calendar",
  templateUrl: "./tac-calendar.component.html",
  styleUrls: ["./tac-calendar.component.scss"]
})
export class TacCalendarComponent {
  public viewType: ViewType = "week";

  public baseDate = new Date();
  public baseDateMiniMonth = new Date();

  public get displayPeriod(): string {
    switch (this.viewType) {
      case "day":
        return this.datePipe.transform(
          this.baseDate,
          "EEEE, dd 'de' MMM 'de' yyyy"
        );
      case "week":
        const startDay = startOfWeek(this.baseDate);
        const endDay = endOfWeek(this.baseDate);

        return `${this.datePipe.transform(
          startDay,
          "dd MMM"
        )} - ${this.datePipe.transform(endDay, "dd MMM 'de' yyyy")}`;
      case "month":
        return this.datePipe.transform(this.baseDate, "MMMM/yyyy");
      default:
        return this.datePipe.transform(this.baseDate, "yyyy");
    }
  }

  public optionsSchedule: OptionsSchedule = {
    startInterval: 480,
    endInterval: 720,
    interval: 10
  };

  constructor(private datePipe: DatePipe) {}

  public prev() {
    switch (this.viewType) {
      case "day":
        this.baseDate = addDays(this.baseDate, -1);
        break;
      case "week":
        this.baseDate = addWeeks(this.baseDate, -1);
        break;
      case "month":
        this.baseDate = addMonths(this.baseDate, -1);
        break;
      default:
        this.baseDate = addYears(this.baseDate, -1);
        break;
    }
  }

  public next() {
    switch (this.viewType) {
      case "day":
        this.baseDate = addDays(this.baseDate, 1);
        break;
      case "week":
        this.baseDate = addWeeks(this.baseDate, 1);
        break;
      case "month":
        this.baseDate = addMonths(this.baseDate, 1);
        break;
      default:
        this.baseDate = addYears(this.baseDate, 1);
        break;
    }
  }

  public prevMiniMonth() {
    this.baseDateMiniMonth = addMonths(this.baseDateMiniMonth, -1);
  }
  public nextMiniMonth() {
    this.baseDateMiniMonth = addMonths(this.baseDateMiniMonth, 1);
  }

  public today = () => (this.baseDate = new Date());

  public updateOptionsSchedule = () => {
    const baseDateBkp = new Date(this.baseDate);
    this.baseDate = null;
    this.baseDate = baseDateBkp;
  };

  public onClickDay(date: Date) {
    this.baseDate = new Date(date);
    this.viewType = "day";
  }

  @HostListener("document:keydown.shift.y", ["$event"])
  onKeyDownY = () => (this.viewType = "year");

  @HostListener("document:keydown.shift.m", ["$event"])
  onKeyDownM = () => (this.viewType = "month");

  @HostListener("document:keydown.shift.w", ["$event"])
  onKeyDownW = () => (this.viewType = "week");

  @HostListener("document:keydown.shift.d", ["$event"])
  onKeyDownD = () => (this.viewType = "day");
}
