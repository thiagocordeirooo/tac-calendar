import { Component, Input, Output, EventEmitter } from "@angular/core";

import { getYear } from "date-fns";

@Component({
  selector: "app-year",
  templateUrl: "./year.component.html",
  styleUrls: ["./year.component.scss"]
})
export class YearComponent {
  public months: Date[] = [];

  @Input()
  public set baseDate(v: Date) {
    this.months = [];

    for (let index = 0; index < 12; index++) {
      this.months.push(new Date(getYear(v), index));
    }
  }

  @Output()
  public onClickDay = new EventEmitter<any>();
}
