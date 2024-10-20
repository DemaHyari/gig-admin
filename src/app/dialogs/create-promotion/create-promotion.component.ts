import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/common/http-client/http.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';
import * as uuid from 'uuid';
export interface PromotionData {
  id?: number;
  image?: string;
  type?: number;
}
@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent {
  addPromotionFormGroup: FormGroup;
  promotionType = [
    { name: 'promotion.health', value: 0},
    { name: 'promotion.motors', value: 1 }
  ];
  file: any;
  constructor(
    public fb: FormBuilder,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: PromotionData,
    public dialogRef: MatDialogRef<CreatePromotionComponent, boolean>,
  ) {
    this.addPromotionFormGroup = this.fb.group({
      id: [uuid.v4()],
      image: ['', [Validators.required]],
      type: [ this.promotionType[0], [Validators.required] ],

    });
  }

  ngOnInit(): void { }

  cancel(): void {
    this.dialogRef.close(false);
  }
  create(){
    let p ={
      image: this.addPromotionFormGroup.get('image').value,
      type: this.addPromotionFormGroup.get('type').value
    }
    this.httpService.postfiles(`Storage/UploadFile`, this.file).subscribe({
      next: res => {
        this.httpService.sendPostRequest('api/Promotion/AddPromotion', p).subscribe({
          next: res => {
            this.cancel();
          },
          error: error => { console.log(error); this.spinnerService.hideSpinner(); },
          complete: () => this.spinnerService.hideSpinner()
        })
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); }
    });
  }
  uploadLogoFile(event) {
    if (event.target.files) {
      let logoFile = event.target.files[0];
      const data = new FormData();
      const uuidName = 'promotion/' + uuid.v4() + '.' +logoFile.type.split('/')[1];
      this.addPromotionFormGroup.get('image').setValue(uuidName);
      data.append("logoFile", logoFile, uuidName);
      this.file = data;
    }
  }
}
