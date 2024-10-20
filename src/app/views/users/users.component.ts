import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { HttpService } from 'src/app/common/http-client/http.service';
import { MessagingService } from 'src/app/common/messaging/messaging.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [];
  loading: boolean = true;

  constructor(
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    private messagingService: MessagingService,
  ) {
    this.getUsers()
  }

  ngOnInit(): void {

  }
  getUsers() {
    this.spinnerService.showSpinner();
    this.httpService.sendGetRequest('api/User').subscribe({
      next: res => {
        this.users = res.result;
        this.loading = false;
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); },
      complete: () => this.spinnerService.hideSpinner()

    })
  }
  toggleStatus(status, userId) {
    this.spinnerService.showSpinner();
    let id = { userId: userId }
    if (status) {
      this.httpService.sendPostRequest('api/User/DeactivationUser', id).subscribe({
        next: res => {
          this.getUsers();
        },
        error: error => {
          console.log(error);
          this.messagingService.addErrorMessageFromServer('messages.status_changed_failed');
          this.spinnerService.hideSpinner();
        },
        complete: () => this.messagingService.addInfoMessage('messages.status_changed_successfully')
      })
    } else {
      this.httpService.sendPostRequest('api/User/ActivationUser', id).subscribe({
        next: res => {
          this.getUsers();
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
  clear(table: Table) {
    table.clear();
  }
}
