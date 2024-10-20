import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {

  @ViewChild("calendarField")
  calendarField: Calendar;

  @Input()
  required: boolean;

  @Input()
  selectionMode:string = "single";

  @Input()
  _selectedValue: any;

  @Input()
  label: string;

  @Input()
  timeOnly: boolean;

  @Input()
  maxDate:  Date;

  propagateChange = (_: any) => { };
  disabled: boolean;

  get selectedValue() {
    return this._selectedValue;
  }

  set selectedValue(newValue: any) {
    this._selectedValue = newValue;
    this.propagateChange(this._selectedValue);
  }

  onFieldWrapperClick(event) {

    if (event.target.classList.contains('field-wrapper') || event.target.classList.contains('field-label')) {
      this.calendarField.inputfieldViewChild.nativeElement.focus();
      event.stopPropagation();
    }
  }

  onChange(event) {
    this.propagateChange(this._selectedValue);
  }

  writeValue(value: any): void {
    this.selectedValue = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
