import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SpinnerService } from "../../common/spinner/spinner.service";
import { UserSessionService } from "../../security/user-session.service";
import { HttpService } from "../../common/http-client/http.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.scss"]
})
export class TemplateComponent implements OnInit {
  sideNavOpened: boolean;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    private translateService: TranslateService,
    private userSessionService: UserSessionService) { }

  ngOnInit() {
    console.log(this.getLoggedInUser(), this.translateService.currentLang);
    setTimeout(
      function () {
        this.sideNavOpened = true;
      }.bind(this),
      200
    );
  }

  setSelectedLanguage(languageId) {
    this.spinnerService.showSpinner();
    this.httpService.sendPostRequest('api/Admin/UpdateUserSettingLanguage', {"language": languageId}).subscribe(
      data => {
        this.userSessionService.removeLanguage();
        this.userSessionService.storelanguage(languageId);
        this.userSessionService.refershLoginToken().then(
          () => {
            this.spinnerService.hideSpinner();
          },
          error => {
            this.spinnerService.hideSpinner();
          }
        );
      },
      error => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  getSelectedLanguage() {
    return this.userSessionService.getLanguage();
  }

  logout() {
    this.spinnerService.showSpinner();
    this.userSessionService.removeLoginToken();
    this.userSessionService.removeLanguage();
    this.router.navigate(["/loginView"]);
    this.spinnerService.hideSpinner();
  }

  getLoggedInUser() {
    return this.userSessionService.getLoggedInUser();
  }
}
