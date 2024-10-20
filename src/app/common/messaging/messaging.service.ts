import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MessagingService {
  constructor(private messageService: MessageService, private translateService: TranslateService) { }

  addInfoMessage(title: string, body?: string) {
    this.translateService.get(title).subscribe(localizedTitle => {
      if (!body) {
        this.messageService.add({ severity: "info", summary: localizedTitle, detail: null });
      } else {
        this.translateService.get(body).subscribe(localizedBody => {
          this.messageService.add({ severity: "info", summary: localizedTitle, detail: localizedBody });
        });
      }
    });
  }

  addSuccessMessage(title: string, body?: string) {
    this.translateService.get(title).subscribe(localizedTitle => {
      if (!body) {
        this.messageService.add({ severity: "success", summary: localizedTitle, detail: null, life: 100 });
      } else {
        this.translateService.get(body).subscribe(localizedBody => {
          this.messageService.add({ severity: "success", summary: localizedTitle, detail: localizedBody });
        });
      }
    });
  }

  addErrorMessage(title: string, body?: string, titleArg?) {
    this.translateService.get(title, { arg: titleArg }).subscribe(localizedTitle => {
      if (!body) {
        this.messageService.add({ severity: "error", summary: localizedTitle, detail: null });
      } else {
        this.translateService.get(body).subscribe(localizedBody => {
          this.messageService.add({ severity: "error", summary: localizedTitle, detail: localizedBody });
        });
      }
    });
  }

  addErrorMessageFromServer(error) {
    if (error && error.message) {
      this.messageService.add({ severity: "error", summary: error.message, detail: null });
    } else {
      this.addErrorMessage("messages.save_failed_message", error.message);
    }
  }
}
