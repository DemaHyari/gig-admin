import { Component, OnInit, Input, forwardRef, Output, EventEmitter, ViewChild, OnDestroy } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AutoComplete } from "primeng/autocomplete";
import { LocalizationPipe } from "../../common/localization/localization.pipe";
import { LocalizationService } from "../../common/localization/localization.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild("autoCompleteField")
  autoCompleteField: AutoComplete;

  @Input()
  required: boolean;

  @Input()
  readonly: boolean;

  @Input()
  selectedValue: any;

  @Input()
  field: string;

  @Input()
  descriptionField: string;

  @Input()
  label: string;

  @Input()
  multiple: boolean = false;

  @Input()
  localized: boolean = false;

  autocompleteResult: any[];

  @Output("completeMethod")
  autocompleteEvent = new EventEmitter<any>();

  @Output("onChange")
  onChangeEvent = new EventEmitter<any>();

  @Output("onKeyUp")
  onKeyUpEvent = new EventEmitter<any>();

  _onChange = (_: any) => { };
  disabled: boolean;

  private languageChangeEventSubscription: any;

  constructor(private localizationPipe: LocalizationPipe, private localizationService: LocalizationService) { }

  ngOnInit(): void {
    if (this.localized) {
      this.languageChangeEventSubscription = this.localizationService.languageChangeEvent.subscribe(lang => {
        if (!this.selectedValue) {
          return;
        }
        if (this.multiple) {
          this.selectedValue.forEach(element => {
            if (!this.descriptionField) {
              element[this.field] = this.localizationPipe.transform(element, this.field);
            } else {
              element[this.field] = this.localizationPipe.transform(element, this.field) + " (" + element[this.descriptionField] + ")";
            }
          });
        } else {
          if (!this.descriptionField) {
            this.selectedValue[this.field] = this.localizationPipe.transform(this.selectedValue, this.field);
          } else {
            this.selectedValue[this.field] = this.localizationPipe.transform(this.selectedValue, this.field) + " (" + this.selectedValue[this.descriptionField] + ")";
          }
        }
        this.writeValue(this.selectedValue);
      });
    }
  }

  get suggestions() {
    return this.autocompleteResult;
  }

  @Input("suggestions")
  set suggestions(suggestions) {
    var isLocalized = this.localized == true; //returns true
    if (!isLocalized || !suggestions) {
      this.autocompleteResult = suggestions;
    } else {
      this.autocompleteResult = [];
      suggestions.forEach(element => {
        var obj = {};
        Object.entries(element).forEach(entry => {
          obj[entry[0]] = entry[1];
        });
        if (!this.descriptionField) {
          obj[this.field] = this.localizationPipe.transform(element, this.field);
        } else {
          obj[this.field] = this.localizationPipe.transform(element, this.field) + " (" + element[this.descriptionField] + ")";
        }
        this.autocompleteResult.push(obj);
      });
    }
  }

  checkAutocompleteEmptyValue(event) {
    if (!event.target.value && !this.multiple) {
      this.selectedValue = null;
      this.emitValueChange(this.selectedValue);
    }
  }

  onWrapperClick() {
    if (this.multiple) {
      this.autoCompleteField.multiInputEL.nativeElement.focus();
    } else {
      this.autoCompleteField.inputEL.nativeElement.focus();
    }
  }

  autoComplete(event) {
    this.autocompleteEvent.emit(event);
  }

  emitValueChange(event) {
    this._onChange(this.selectedValue);
    this.onChangeEvent.emit(this.selectedValue);
  }

  onKeyUp(event) {
    this.onKeyUpEvent.emit(event);
  }

  writeValue(value: any): void {
    var isLocalized = this.localized == true;
    if (!value) {
      this.selectedValue = null;
    } else if (!isLocalized) {
      this.selectedValue = value;
    } else {
      if (this.multiple) {
        this.selectedValue = [];
        value.forEach(element => {
          var object = {};
          Object.entries(element).forEach(entry => {
            object[entry[0]] = entry[1];
          });
          if (!this.descriptionField) {
            object[this.field] = this.localizationPipe.transform(element, this.field);
          } else {
            object[this.field] = this.localizationPipe.transform(element, this.field) + " (" + element[this.descriptionField] + ")";
          }
          this.selectedValue.push(object);
        });
      } else {
        this.selectedValue = {};
        Object.entries(value).forEach(entry => {
          this.selectedValue[entry[0]] = entry[1];
        });
        if (!this.descriptionField) {
          this.selectedValue[this.field] = this.localizationPipe.transform(value, this.field);
        } else {
          this.selectedValue[this.field] = this.localizationPipe.transform(value, this.field) + " (" + value[this.descriptionField] + ")";
        }
      }
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    if (this.localized) {
      this.languageChangeEventSubscription.unsubscribe();
    }
  }
}
