import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { HttpService } from "../../common/http-client/http.service";
import { UserSessionService } from "../../security/user-session.service";
import { SpinnerService } from "../../common/spinner/spinner.service";
import { MessagingService } from "src/app/common/messaging/messaging.service";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, map, Subscription, timer } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private httpService: HttpService,
    private userSessionService: UserSessionService,
    private spinnerService: SpinnerService,
    protected messagingService: MessagingService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.spinnerService.hideSpinner();
  }

  ngOnDestroy(): void {
  }
}
