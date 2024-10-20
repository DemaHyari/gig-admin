import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from "./app.component";
import { ApplicationInitializerService } from "./application-initializer.service";
import { BlockUIModule } from "primeng/blockui";
import { AppSharedModule } from "./appShared.module";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { ToastModule } from 'primeng/toast';
import { AppCoreModule } from "./appCore.module";
import { HttpClient } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";

export function applicationInitializerFactory(applicationInitializerService: ApplicationInitializerService): Function {
  return () => applicationInitializerService.init();
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/localization/text.", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    AppSharedModule,
    ToastModule,
    BlockUIModule,
    MatProgressSpinnerModule,
    AppCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
    ApplicationInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInitializerFactory,
      deps: [ApplicationInitializerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
