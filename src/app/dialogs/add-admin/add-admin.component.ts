import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/common/http-client/http.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';

export interface Admin {
  userName?: string;
  email?: string;
  mobile?: string;
}
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {
  addAdminFormGroup: FormGroup;
  constructor(
    public fb: FormBuilder,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: Admin,
    public dialogRef: MatDialogRef<AddAdminComponent, boolean>,
  ) {
    this.addAdminFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
    });
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
  addAdmin(){
    this.httpService.sendPostRequest('api/Admin/AddAdminUser', this.addAdminFormGroup.value).subscribe({
      next: res => {
        this.cancel();
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); },
      complete: () => this.spinnerService.hideSpinner()
    })

  }
}
