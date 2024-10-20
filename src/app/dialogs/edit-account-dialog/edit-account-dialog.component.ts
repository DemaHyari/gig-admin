import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "../../common/http-client/http.service";
import { MessagingService } from "../../common/messaging/messaging.service";
import { SpinnerService } from "../../common/spinner/spinner.service";
import { UserSessionService } from "../../security/user-session.service";

@Component({
  selector: "app-edit-account-dialog",
  templateUrl: "./edit-account-dialog.component.html",
  styleUrls: ["./edit-account-dialog.component.scss"]
})
export class EditAccountDialogComponent implements OnInit {
  @ViewChild("form") form: NgForm;
  dialogOpened: boolean;

  constructor(
    private httpService: HttpService,
    private userSessionService: UserSessionService,
    private messagingService: MessagingService,
    private spinnerService: SpinnerService) { }

  ngOnInit() { }

  openDialog() {
    this.spinnerService.showSpinner();
    var userId = this.userSessionService.getLoggedInUser().id;
    this.httpService.sendGetRequest("application-users/" + userId).subscribe(
      data => {
        data.password = null;
        this.dialogOpened = true;
        this.form.form.patchValue(data);
        this.spinnerService.hideSpinner();
      },
      error => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  closeDialog() {
    this.dialogOpened = false;
    this.form.form.reset();
  }

  submitDialog() {
    if (this.form.invalid) {
      this.messagingService.addErrorMessage("messages.required_fields_message");
      return;
    }
    if ((this.form.value.newPassword || this.form.value.newPasswordConfirmation) && this.form.value.newPassword != this.form.value.newPasswordConfirmation) {
      this.messagingService.addErrorMessage("messages.password_do_not_match_message");
      return;
    }

    this.spinnerService.showSpinner();

    this.httpService.sendPutRequest("application-users/" + this.form.value.id + "/account", this.form.value).subscribe(
      data => {
        this.messagingService.addSuccessMessage("messages.saved_successfully_message");
        this.userSessionService.refershLoginToken().then(
          () => {
            this.closeDialog();
            this.spinnerService.hideSpinner();
          },
          error => {
            this.spinnerService.hideSpinner();
          }
        );
      },
      error => {
        this.messagingService.addErrorMessageFromServer(error.error);
        this.spinnerService.hideSpinner();
      }
    );
  }
}
