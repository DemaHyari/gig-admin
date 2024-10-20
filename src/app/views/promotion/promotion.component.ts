import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { HttpService } from 'src/app/common/http-client/http.service';
import { MessagingService } from 'src/app/common/messaging/messaging.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';
import { CreatePromotionComponent, PromotionData } from 'src/app/dialogs/create-promotion/create-promotion.component';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  promotions = [];

  constructor(
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
    private messagingService: MessagingService,
  ) {
    this.spinnerService.showSpinner();
  }

  ngOnInit(): void {
    this.getPromotions();
  }
  getPromotions(){
    this.spinnerService.showSpinner();
    this.httpService.sendGetRequest('api/Promotion').subscribe({
      next: res => {
        this.promotions = res.result;
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); },
      complete: () => this.spinnerService.hideSpinner()

    })
  }
  addPromositon() {
    this.dialog.open<CreatePromotionComponent, PromotionData, boolean>(CreatePromotionComponent, {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {}
    }).afterClosed().subscribe(()=>this.getPromotions());
  }
  deletePromotion(id: string, file: string, type: number) {
    const promotion = {
      id:id, image: file, type: type
    }
    this.httpService.postfiles(`Storage/DeleteFile?fileName=${file}`).subscribe({
      next: res => {
        this.httpService.sendPostRequest('api/Promotion/DeletePromotion', promotion).subscribe({
          next: res => this.getPromotions(),
          error: error => { console.log(error); this.spinnerService.hideSpinner(); },
          complete: () => this.spinnerService.hideSpinner()
        });
      },
      error: error => {
        console.log(error);
        this.messagingService.addErrorMessageFromServer('messages.delete_promotion_faild');
        this.spinnerService.hideSpinner();
      },
      complete: () => this.messagingService.addInfoMessage('messages.delete_promotion_successfully')
    });
  }
  downloadimage(file: string) {
    this.httpService.getFiles(`Storage/GetFileBlob?fileName=${file}`).subscribe(
      res => {
        saveAs(res, file)
      }
    )
  }
}
