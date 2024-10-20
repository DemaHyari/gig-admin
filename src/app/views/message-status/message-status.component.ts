import { Component, OnInit, Renderer2 } from '@angular/core';
import * as saveAs from 'file-saver';
import { HttpService } from 'src/app/common/http-client/http.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';

@Component({
  selector: 'app-message-status',
  templateUrl: './message-status.component.html',
  styleUrls: ['./message-status.component.scss']
})
export class MessageStatusComponent implements OnInit {
  messages = [];

  constructor(
    private renderer: Renderer2,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
  ) {
    this.spinnerService.showSpinner();
  }

  ngOnInit(): void {
    this.httpService.sendGetRequest('api/Help/LoadMessage').subscribe({
      next: res => {
        this.messages = res.result;
      },
      error: error => { console.log(error); this.spinnerService.hideSpinner(); },
      complete: () => this.spinnerService.hideSpinner()
    })
  }
  getFile(file: string){
    this.httpService.getFiles(`Storage/GetFileBlob?fileName=${file}`).subscribe(
      res => {
        saveAs(res, file)
      }
    )
  }
}
