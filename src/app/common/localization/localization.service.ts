import { Injectable, EventEmitter } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { HttpService } from "../http-client/http.service";

@Injectable()
export class LocalizationService {
  languages: any[];
  languageChangeEvent: EventEmitter<String> = new EventEmitter<String>();
  currentLang: string;
  constructor(
    private httpService: HttpService,
    private translateService: TranslateService,
  ) {
    translateService.onLangChange.subscribe((params: LangChangeEvent) => {
      this.languageChangeEvent.emit(params.lang);
    });
  }

  init() {
    console.log("Initializing localization service");
    this.translateService.setDefaultLang("en");
    this.languages = [
      {"id":"ar", "name":"العربية"},
      {"id":"en", "name":"English"}
    ];
    return Promise.resolve();
    // return this.httpService
    //   .sendGetRequest("languages")
    //   .toPromise()
    //   .then(data => {
    //     this.languages = data;
    //     return Promise.resolve();
    //   })
    //   .catch((err: any) => {
    //     return Promise.reject("Failed to initialize localization service");
    //   });
  }

  getLocalizedDetails(object) {
    for (let localizedDetails of object.localizedDetails) {
      if (localizedDetails.language.id == this.currentLang) {
        return localizedDetails;
      }
    }
  }
}
