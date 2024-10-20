import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formTitle: any;

  @Input("isNew")
  isNew: boolean;

  @Input("creator")
  creator: any;

  @Input("lastEditor")
  lastEditor: any;

  @Input("createdTime")
  createdTime: any;

  @Input("lastModifiedTime")
  lastModifiedTime: any;

  constructor() { }

  ngOnInit() {
  }

  @Input("title")
  set title(title) {
    this.formTitle = { arg: title }
  }

}
