import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {MatSort} from '@angular/material/sort';
import { HttpService } from "../common/http-client/http.service";
import { ConfirmationService } from "primeng/api";
import { MessagingService } from "../common/messaging/messaging.service";
import { SpinnerService } from "../common/spinner/spinner.service";
import { LocalizationService } from "../common/localization/localization.service";
import { TranslateService } from "@ngx-translate/core";
import { ExcelExporterService } from "../common/exporter/excel-exporter.service";
import { PdfExportService } from "../common/pdf/pdf-export.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Input("viewTitle") viewTitle: string;
  @Input("addNewLabel") addNewLabel: string;
  @Input("columnsDef") columnsDef: any;
  @Input("serviceName") serviceName: string;
  @Input("predefinedFilters") predefinedFilters: any = {};

  dataSource: any[] = [];
  filters: any = {};

  @Output("onViewLoad") onViewLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output("onLangChange") onLangChange: EventEmitter<any> = new EventEmitter<any>();

  langChangeSubscription: any;

  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService,
    private spinnerService: SpinnerService,
    private localizationService: LocalizationService,
    private translateService: TranslateService,
    private excelExporterService: ExcelExporterService,
    private pdfExportService: PdfExportService,
    private router:Router,
  ) { }

  ngOnInit() {
    if (!this.addNewLabel) {
      this.addNewLabel = this.translateService.instant("layout_text.add_new");
      this.translateService.onLangChange.subscribe(newLang => {
        this.addNewLabel = this.translateService.instant("layout_text.add_new");
      });
    }
    this.paginator.pageSize = 10;
    this.paginator.page.subscribe(p => {
      this.loadDataTable();
    });
    this.sort.sortChange.subscribe(p => {
      this.loadDataTable();
    });
    this.loadDataTable();

    this.langChangeSubscription = this.localizationService.languageChangeEvent.subscribe(newLang => {
      this.onLangChange.emit(this.dataSource);
    });
  }

  get allColumns() {
    var allColumns = Object.keys(this.columnsDef);
    allColumns.unshift("actions");
    return allColumns;
  }

  get dynamicColumns() {
    return Object.keys(this.columnsDef);
  }

  getColumnValue(rowObj, columnName) {
    var fieldVarName = this.columnsDef[columnName].fieldVarName;
    var keys = fieldVarName.split(".");
    var rawValue = rowObj;
    for (var index = 0; index < keys.length - 1; index++) {
      rawValue = rawValue[keys[index]];
    }
    if (!this.columnsDef[columnName].localized) {
      if(rawValue !== null){
      rawValue = rawValue[keys[keys.length - 1]];
      }else {
        rawValue = '';
      }
    }
    if (!this.columnsDef[columnName].multiValue) {
      if (this.columnsDef[columnName].localized) {
        if(rawValue){
        return this.localizationService.getLocalizedDetails(rawValue)[this.getLocalizedFieldName(columnName)];
        }else{
          return "";
        }
      } else {
        return rawValue;
      }
    } else {
      var value = "";
      var values = rawValue;
      for (var index = 0; index < values.length; index++) {
        if (this.columnsDef[columnName].localized) {
          value += this.localizationService.getLocalizedDetails(values[index])[this.getLocalizedFieldName(columnName)];
        } else {
          value += values[index];
        }
        if (index < values.length - 1) {
          value += ", ";
        }
      }
      return value;
    }
  }

  getLocalizedFieldName(columnName) {
    var keys = this.columnsDef[columnName].fieldVarName.split(".");
    return keys[keys.length - 1];
  }

  getPageSizeOptionsArray(){
    return [5, 10, 20,this.paginator.length];
  }

  loadDataTable(): void {
    this.spinnerService.showSpinner();
    var requestData = {
      page_number: this.paginator.pageIndex,
      page_size: this.paginator.pageSize,
      ...this.predefinedFilters,
      ...this.filters,
      ...{ sort_field: this.sort.active, sort_order: this.sort.direction }
    };
    this.httpService.sendGetRequest(this.serviceName, requestData).subscribe(
      (data: any) => {
        this.dataSource = data.rows;
        this.paginator.length = data.totalElements;
        this.spinnerService.hideSpinner();
        this.onViewLoad.emit(data.rows);
      },
      error => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  deleteItem(itemId): void {
    this.translateService.get("messages.deletion_confirmation_prompt").subscribe(promptMessage => {
      this.confirmationService.confirm({
        message: promptMessage,
        accept: () => {
          this.spinnerService.showSpinner();
          this.httpService.sendDeleteRequest(this.serviceName + "/" + itemId).subscribe(
            (data: any) => {
              this.loadDataTable();
              this.messagingService.addSuccessMessage("messages.deleted_successfully_message");
              this.spinnerService.hideSpinner();
            },
            error => {
              console.log(error);
              this.messagingService.addErrorMessage("messages.deletion_failed_message", error.message);
              this.spinnerService.hideSpinner();
            }
          );
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  exportViewToExcel() {
    this.spinnerService.showSpinner();
    var requestData = {
      page_number: 0,
      page_size: -1,
      ...this.predefinedFilters,
      ...this.filters,
      ...{ sort_field: this.sort.active, sort_order: this.sort.direction }
    };
    this.httpService.sendGetRequest(this.serviceName, requestData).subscribe(
      (data: any) => {
        if (!data || !data.rows || data.rows.length < 1) {
          return;
        }
        var rowsToExport = [];
        data.rows.forEach(row => {
          var exportedRow = {};
          this.dynamicColumns.forEach(columnName => {
            var columnLocalizedHeaderLabel = this.translateService.instant("layout_text." + this.columnsDef[columnName].label);
            exportedRow[columnLocalizedHeaderLabel] = this.getColumnValue(row, columnName);
          });
          rowsToExport.push(exportedRow);
        });
        this.excelExporterService.exportAsExcelFile(rowsToExport, this.viewTitle);
        this.spinnerService.hideSpinner();
      },
      error => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  exportViewToPdf() {
    this.spinnerService.showSpinner();
    var table = document.createElement("table");
    table.style.width = "100%";
    table.border = "1px";

    var headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    this.dynamicColumns.forEach(columnName => {
      var th = document.createElement("th");
      th.innerText = this.translateService.instant("layout_text." + this.columnsDef[columnName].label);
      headerRow.appendChild(th)
    });

    var requestData = {
      page_number: 0,
      page_size: -1,
      ...this.predefinedFilters,
      ...this.filters,
      ...{ sort_field: this.sort.active, sort_order: this.sort.direction }
    };
    this.httpService.sendGetRequest(this.serviceName, requestData).subscribe(
      (data: any) => {

        if (!data || !data.rows || data.rows.length < 1) {
          return;
        }
        data.rows.forEach(row => {
          var bodyRow = document.createElement("tr");
          table.appendChild(bodyRow);
          this.dynamicColumns.forEach(columnName => {
            var td = document.createElement("td");
            td.innerText = this.getColumnValue(row, columnName);
            bodyRow.appendChild(td);
          });
        });
        this.spinnerService.hideSpinner();
        this.pdfExportService.changeMessage(table);
        this.router.navigate(['../../app/misc/pdf']);

      });
    }

    navigateToDocument(documentId) {

      this.spinnerService.showSpinner();
      var url = this.router.url.split("?")[0].replace("/views/", "/forms/");
      if (documentId) {
        this.router.navigate([url], { queryParams: { document_id: documentId } });
      } else {
        this.router.navigate([url], { queryParams: { is_new: true } });
      }
      this.spinnerService.hideSpinner();
    }


}
