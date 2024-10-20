import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from 'src/app/common/http-client/http.service';
import { MessagingService } from 'src/app/common/messaging/messaging.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';
import { UserSessionService } from 'src/app/security/user-session.service';

@Component({
  selector: 'app-verfiy-otp',
  templateUrl: './verfiy-otp.component.html',
  styleUrls: ['./verfiy-otp.component.scss']
})
export class VerfiyOTPComponent implements OnInit, AfterViewInit {
  @ViewChild("form") form: NgForm;
  valid_otp: boolean = true;
  otp: number = null;
  username: string = '';
  constructor(
    private router: Router,
    private httpService: HttpService,
    private userSessionService: UserSessionService,
    private spinnerService: SpinnerService,
    private messagingService: MessagingService,
    private translateService: TranslateService
  ) {
    this.spinnerService.showSpinner();
    if (this.userSessionService.getUsername() != '') {
      this.username = this.userSessionService.getUsername();
    } else {
      this.router.navigate(["/loginView"]);
    }

  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.spinnerService.hideSpinner();
  }
  sendOtp() {
    this.httpService.sendGetRequest(`api/Authentication/GetVerificationCode?username=${this.form.value.username}`).subscribe({
      next: res => this.otp = res.result,
      error: error => console.log(error),
      complete: () => { this.spinnerService.hideSpinner(); console.log(this.otp) }
    })
  }
  onOtpChange($event: any) {
    if ($event.length == 5) {
      this.otp = $event;
    }
  }

  validateOtp() {
    this.valid_otp = false;
    this.userSessionService.authenticateUser(this.username, this.otp).then(
      (res) => {
        this.router.navigate(["/app/views/dashboard"]);
        this.spinnerService.hideSpinner();
      },
      error => {
        console.log(error);
        this.messagingService.addErrorMessage("messages.invalid_login_message")
        this.spinnerService.hideSpinner();
      }
    );
  }
  setSelectedLanguage(languageId) {
    this.translateService.use(languageId);
  }
  getSelectedLanguage() {
    return this.translateService.currentLang;
  }
}
