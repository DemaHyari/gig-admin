import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { HttpService } from "./common/http-client/http.service";
import { SpinnerService } from "./common/spinner/spinner.service";
import { Router } from '@angular/router';
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MarinaBits-Client-Template';
  showSpinner: boolean = false;
  spinnerEventSubscription: any;
  primary_color: string = '#282E85';
  secondary_color: string = '#fddb00';
  headers_Font_Family: string = "'Dancing Script', cursive";
  main_font: string = "Arial, Helvetica, sans-serif";
  sitelogo: string = '';
  followIUsLinks = [];
  contactUsDetails = [];
  constructor(
    private spinnerService: SpinnerService,
    public translate: TranslateService,
    private httpService: HttpService,
    public router: Router,
    private primengConfig: PrimeNGConfig
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.spinnerEventSubscription = this.spinnerService.spinnerSubject.subscribe(showSpinner => {
      this.showSpinner = showSpinner;
    });
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.spinnerEventSubscription.unsubscribe();
  }
}
