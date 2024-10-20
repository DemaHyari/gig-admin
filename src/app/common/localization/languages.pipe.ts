import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from './localization.service';

@Pipe({
  name: 'languages'
})
export class LanguagesPipe implements PipeTransform {

  constructor(private localizationService: LocalizationService) { }

  transform(value:any): any {
    return this.localizationService.languages;
  }

}
