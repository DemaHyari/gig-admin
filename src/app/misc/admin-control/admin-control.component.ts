import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../common/http-client/http.service';
import { SpinnerService } from '../../common/spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss']
})
export class AdminControlComponent implements OnInit {

  constructor(private http: HttpClient, private httpService: HttpService, private spinnerService: SpinnerService, private datePipe: DatePipe) { }

  ngOnInit() {
  }

  downloadDatabaseBackup() {

    this.spinnerService.showSpinner();
    this.http.get<Blob>(this.httpService.getBackendServiceURL() + "database-backup", { responseType: 'blob' as 'json' }).subscribe(data => {
      const blob = new Blob([data], { type: 'application/zip' });
      const fileName = "vas_db_" + this.datePipe.transform(new Date(), "dd_MM_yyyy") + ".zip";
      saveAs(blob, fileName);
      this.spinnerService.hideSpinner();
    }, error => {
      console.log(error);
      this.spinnerService.hideSpinner();
    });

  }

}
