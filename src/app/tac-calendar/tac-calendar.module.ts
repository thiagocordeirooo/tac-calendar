import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DayComponent } from "./day/day.component";
import { MiniMonthComponent } from "./mini-month/mini-month.component";
import { MonthComponent } from "./month/month.component";
import { TacCalendarComponent } from "./tac-calendar.component";
import { WeekComponent } from "./week/week.component";
import { YearComponent } from "./year/year.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    TacCalendarComponent,
    YearComponent,
    MiniMonthComponent,
    MonthComponent,
    WeekComponent,
    DayComponent
  ],
  providers: [DatePipe],
  exports: [TacCalendarComponent]
})
export class TacCalendarModule {}
