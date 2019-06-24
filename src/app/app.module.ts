import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { registerLocaleData } from "@angular/common";
import ptBr from "@angular/common/locales/pt";
registerLocaleData(ptBr);

import { TacCalendarModule } from "./tac-calendar/tac-calendar.module";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, TacCalendarModule],
  declarations: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
