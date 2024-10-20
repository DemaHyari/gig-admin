import { NgModule } from "@angular/core";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { AppSharedModule } from "../appShared.module";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { DatePickerComponent } from "./date-picker/date-picker.component";

@NgModule({
    imports: [
        AppSharedModule,

        AutoCompleteModule,
        CalendarModule,
    ],
    declarations: [
        AutocompleteComponent,
        DatePickerComponent,
    ],
    providers: [
    ],
    exports: [
        AutocompleteComponent,
        DatePickerComponent
    ]
})
export class AppFieldsModule { }
