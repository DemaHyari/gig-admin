import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from './localization.service';

@Pipe({
  name: 'localized',
  pure: false
})
export class LocalizationPipe implements PipeTransform {

  constructor(private localizationService: LocalizationService) { }


  transform(value: any, field?: any): any {

    if (!value) {
      return null;
    }
    if (value instanceof Array) {
      let result = [];
      value.forEach(element => {
        let localizedDetails = this.localizationService.getLocalizedDetails(element);
        result.push(localizedDetails[field]);
      });
      return result;
    } else {
      let localizedDetails = this.localizationService.getLocalizedDetails(value);
      if (!localizedDetails) {
        return null;
      }

      if (field) {
        return localizedDetails[field];
      } else {
        return localizedDetails;
      }
    }
  }

}
