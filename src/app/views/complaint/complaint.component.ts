import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { HttpService } from 'src/app/common/http-client/http.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  complaints = [];

  constructor(
    private httpService: HttpService,
    private spinnerService: SpinnerService,
  ) {
    this.spinnerService.showSpinner();
  }

  ngOnInit(): void {
    this.httpService.sendGetRequest('api/Help/LoadComplaint').subscribe({
      next: res => {
        console.log("🚀 ~ file: message-status.component.ts:37 ~ MessageStatusComponent ~ this.httpService.sendGetRequest ~ res", res)
        this.complaints = res.result;
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); },
      complete: () => this.spinnerService.hideSpinner()

    })
  }
  getFile(file: string) {
    this.httpService.getFiles(`Storage/GetFileBlob?fileName=${file}`).subscribe(
      res => {
        saveAs(res, file)
      }
    )
  }
}
