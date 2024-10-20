import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/common/http-client/http.service';
import { MessagingService } from 'src/app/common/messaging/messaging.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';
import { AddAdminComponent, Admin } from 'src/app/dialogs/add-admin/add-admin.component';

@Component({
  selector: 'app-access-privilage',
  templateUrl: './access-privilage.component.html',
  styleUrls: ['./access-privilage.component.scss']
})
export class AccessPrivilageComponent implements OnInit {
  users = [];

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    private messagingService: MessagingService,
  ) {
    this.getAdmins()
  }

  ngOnInit(): void {

  }
  getAdmins(){
    this.spinnerService.showSpinner();
    this.httpService.sendGetRequest('api/Admin').subscribe({
      next: res => {
        this.users = res.result;
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); },
      complete: () => this.spinnerService.hideSpinner()

    })
  }
  addAdmin() {
    this.dialog.open<AddAdminComponent, Admin, boolean>(AddAdminComponent, {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {}
    }).afterClosed().subscribe(() => this.getAdmins());
  }
  toggleStatus(status, username){
    this.spinnerService.showSpinner();
    let name = { username: username }
    if (status){
      this.httpService.sendPostRequest('api/Admin/DeactivationAdminUser', name).subscribe({
        next: res => {
          this.getAdmins();
        },
        error: error => {
          console.log(error);
          this.messagingService.addErrorMessageFromServer('messages.status_changed_failed');
          this.spinnerService.hideSpinner();
        },
        complete: () => this.messagingService.addInfoMessage('messages.status_changed_successfully')
      })
    }else{
      this.httpService.sendPostRequest('api/Admin/ActivationAdminUser', name).subscribe({
        next: res => {
          this.getAdmins();
        },
        error: error => {
          console.log(error);
          this.messagingService.addErrorMessageFromServer('messages.status_changed_failed');
          this.spinnerService.hideSpinner();
        },
        complete: () => this.messagingService.addInfoMessage('messages.status_changed_successfully')
      })
    }
  }
  toggleAccess(targetView){
    this.spinnerService.showSpinner();
    this.httpService.sendPostRequest('api/Admin/UpdateAdminUserTarget', targetView).subscribe({
      next: res => {
        this.getAdmins();
      },
      error: error => {
        console.log(error);
        this.messagingService.addErrorMessageFromServer('messages.ability_changed_failed');
        this.spinnerService.hideSpinner(); },
      complete: () => this.messagingService.addInfoMessage('messages.ability_changed_successfully')
    })

  }
}
