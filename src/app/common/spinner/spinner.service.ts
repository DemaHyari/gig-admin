import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SpinnerService {

  spinnerSubject: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  showSpinner() {
    setTimeout(() => {
      this.spinnerSubject.next(true);
    }, 0);
  }

  hideSpinner() {
    setTimeout(() => {
      this.spinnerSubject.next(false);
    }, 500);
  }
}
