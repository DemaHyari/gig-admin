import { HostListener, ViewChild, Injector } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "../common/http-client/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MessagingService } from "../common/messaging/messaging.service";
import { SpinnerService } from "../common/spinner/spinner.service";
import { DatePipe } from "@angular/common";
import { LocalizationPipe } from "../common/localization/localization.pipe";
import { UserSessionService } from "../security/user-session.service";
import { LocalizationService } from "../common/localization/localization.service";
import { ConfirmationService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class AbstractFormComponent {
  protected httpService: HttpService;
  protected router: Router;
  protected activatedRoute: ActivatedRoute;
  protected messagingService: MessagingService;
  protected spinnerService: SpinnerService;
  protected datePipe: DatePipe;
  protected localizationService: LocalizationService;
  protected localizationPipe: LocalizationPipe;
  protected userSessionService: UserSessionService;
  protected confirmationService: ConfirmationService;
  protected translateService: TranslateService;

  @ViewChild("form", {static : true})
  form: NgForm;

  isNew: boolean;
  creator: any;
  lastEditor: any;
  createdTime: any;
  lastModifiedTime: any;

  serviceName: string;
  documentHistory: any[];

  constructor(serviceName: string, injector: Injector) {
    this.serviceName = serviceName;

    this.httpService = injector.get(HttpService);
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.messagingService = injector.get(MessagingService);
    this.spinnerService = injector.get(SpinnerService);
    this.datePipe = injector.get(DatePipe);
    this.localizationService = injector.get(LocalizationService);
    this.localizationPipe = injector.get(LocalizationPipe);
    this.userSessionService = injector.get(UserSessionService);
    this.confirmationService = injector.get(ConfirmationService);
    this.translateService = injector.get(TranslateService);

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.is_new) {
        this.isNew = true;
      } else if (params.document_id) {
        this.spinnerService.showSpinner();
        this.httpService.sendGetRequest(this.serviceName + "/" + params.document_id).subscribe(
          data => {
            this.setLocalizedDetailsFromParams(data);
            this.form.form.patchValue(data);
            this.onLoad(data);
            this.creator = data.creator;
            this.lastEditor = data.lastEditor;
            this.createdTime = data.createdTime;
            this.lastModifiedTime = data.lastModifiedTime;
            this.spinnerService.hideSpinner();
          },
          error => {
            console.log(error);
            this.spinnerService.hideSpinner();
          }
        );
      }
    });
  }

  setLocalizedDetailsFromParams(data) {
    if (!data.localizedDetails) {
      return;
    }
    data.localizedDetails.forEach(localizedDetail => {
      var language = localizedDetail.language;
      Object.entries(localizedDetail).forEach(entry => {
        var paramName = entry["0"];
        if (paramName != "language") {
          var fieldName = entry["0"] + "_" + language.id;
          var fieldValue = entry["1"];
          var fieldValueObj = {};
          fieldValueObj[fieldName] = fieldValue;
          this.form.form.patchValue(fieldValueObj);
        }
      });
    });
  }

  onLoad(data) { }


  loadDocumentHistory() {

    this.spinnerService.showSpinner();
    this.httpService.sendGetRequest(this.serviceName + "/" + this.form.value.id + "/history").subscribe(
      data => {
        this.documentHistory = data;
        this.spinnerService.hideSpinner();
      },
      error => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  clearDocumentHistory() {
    this.documentHistory = null;
  }

  save() {
    this.spinnerService.showSpinner();
    this.onBeforeSave();
    if (this.isInvalid()) {
      this.onValidationError();
      this.spinnerService.hideSpinner();
      return;
    }
    var localizedDetails = this.getLocalizedDetailsFromForm();
    var requestData = { ...this.form.value, localizedDetails: localizedDetails };
    var additionalRequestData = this.getAdditionalRequestData();
    if (additionalRequestData) {
      requestData = { ...requestData, ...additionalRequestData };
    }
    if (this.isNew) {
      this.httpService.sendPostRequest(this.serviceName, requestData).subscribe(
        data => {
          this.messagingService.addSuccessMessage("messages.saved_successfully_message");
          this.onSaveSuccess(data);
          this.form.form.patchValue({ id: data.id });
          this.creator = data.creator;
          this.lastEditor = data.lastEditor;
          this.createdTime = data.createdTime;
          this.lastModifiedTime = data.lastModifiedTime;
          this.isNew = false;
          this.spinnerService.hideSpinner();
        },
        error => {
          this.onSaveError(error);
        }
      );
    } else {
      this.httpService.sendPutRequest(this.serviceName + "/" + this.form.value.id, requestData).subscribe(
        data => {
          this.messagingService.addSuccessMessage("messages.saved_successfully_message");
          this.onSaveSuccess(data);
          this.lastEditor = { id: this.userSessionService.getLoggedInUser().id, fullName: this.userSessionService.getLoggedInUser().name };
          this.spinnerService.hideSpinner();
        },
        error => {
          this.onSaveError(error);
        }
      );
    }
  }

  onBeforeSave() { }
  onValidationError() {
    this.messagingService.addErrorMessage("messages.required_fields_message");
  }
  getAdditionalRequestData(): any { }

  onSaveSuccess(data) { }

  onSaveError(error) {
    console.log(error);
    this.messagingService.addErrorMessage("messages.save_failed_message", error.message);
    this.spinnerService.hideSpinner();
  }

  isInvalid() {
    console.log(this.form);
    return this.form.invalid;
  }

  getLocalizedDetailsFromForm() {
    var localizedDetails = [];
    this.localizationService.languages.forEach(language => {
      localizedDetails.push({ language: language });
    });
    Object.entries(this.form.controls).forEach(entry => {
      var fieldName = entry["0"];
      var fieldValue = entry["1"].value;
      if (fieldName.indexOf("_") != -1) {
        var fieldNameParts = fieldName.split("_");
        var paramName = fieldNameParts[0];
        var languageKey = fieldNameParts[1];
        localizedDetails.forEach(localizedDetail => {
          if (localizedDetail.language.id == languageKey) {
            localizedDetail[paramName] = fieldValue;
          }
        });
      }
    });
    return localizedDetails;
  }

  close() {

    this.spinnerService.showSpinner();
    var url = this.router.url.split("?")[0].replace("/forms/", "/views/");
    this.router.navigate([url]);
    this.spinnerService.hideSpinner();
  }

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }

  canDeactivate(): boolean {
    return this.form.submitted || (!this.form.dirty && !this.isStandaloneFieldsDirty());
  }

  isStandaloneFieldsDirty() {
    return false;
  }

  objectComparator(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return false;
    }
    return o1.id == o2.id;
  }

}
