import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MessagingService } from "../../common/messaging/messaging.service";
import { TranslateService } from "@ngx-translate/core";
import { SpinnerService } from "../../common/spinner/spinner.service";
import { UserSessionService } from "../../security/user-session.service";
import { HttpService } from "src/app/common/http-client/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("form") form: NgForm;
  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private spinnerService: SpinnerService,
    private messagingService: MessagingService,
    private translateService: TranslateService,
    private httpService: HttpService,
  ) {
    this.spinnerService.showSpinner();
  }
  ngAfterViewInit(): void {
    this.spinnerService.hideSpinner();
  }

  ngOnInit() { }

  login() {
    this.spinnerService.showSpinner();
    if (this.form.invalid) {
      this.messagingService.addErrorMessage("messages.required_fields_message");
      return;
    }
    this.userSessionService.setUsername(this.form.value.username);
    this.httpService.sendPostRequest('api/Authentication/SendAdminUserLoginVerificationCode', { username: this.form.value.username, password: this.form.value.password }).subscribe({
      next: res => this.router.navigate(["/verfication"]),
      error: e => { this.messagingService.addErrorMessage("messages.invalid_login_message")},
      complete: () => this.spinnerService.hideSpinner()
    });
  }

  setSelectedLanguage(languageId) {
    this.translateService.use(languageId);
  }

  getSelectedLanguage() {
    return this.translateService.currentLang;
  }
}
