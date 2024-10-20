import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PdfExportService{

   data:any;

  private messageSource = new BehaviorSubject<any>({});
  private messageSourceForView = new BehaviorSubject<any>({});

  currentMessage = this.messageSource.asObservable();
  currentMessageForView = this.messageSourceForView.asObservable();

  constructor() {}



   changeMessage(message:any){
    this.messageSource.next(message)
   };

   changeMessageForView(message:any){
      this.messageSourceForView.next(message);



     };

}
