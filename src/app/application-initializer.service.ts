import { Injectable } from "@angular/core";
import { HttpService } from "./common/http-client/http.service";
import { LocalizationService } from "./common/localization/localization.service";
import { UserSessionService } from "./security/user-session.service";

@Injectable()
export class ApplicationInitializerService {
  constructor(private HttpService: HttpService, private localizationService: LocalizationService, private userSessionService: UserSessionService) {}

  init() {
    console.log("Initializing application");
    return this.HttpService.init().then(() => {
      return this.localizationService.init().then(() => {
        return this.userSessionService.init().then(() => {
          console.log("Application initialized successfully");
        });
      });
    });
  }
}
