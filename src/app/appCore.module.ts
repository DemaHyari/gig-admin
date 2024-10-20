import { NgModule } from "@angular/core";
import { AppSharedModule } from "./appShared.module";
import { TemplateComponent } from "./layout/template/template.component";
import { EditAccountDialogComponent } from "./dialogs/edit-account-dialog/edit-account-dialog.component";
import { LoginComponent } from "./misc/login/login.component";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from "./app-routing.module";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from "primeng/api";
import { HttpService } from "./common/http-client/http.service";
import { LocalizationService } from "./common/localization/localization.service";
import { UserSessionService } from "./security/user-session.service";
import { RolePermissionService } from "./security/role-permission.service";
import { LocalizationPipe } from "./common/localization/localization.pipe";
import { MessagingService } from "./common/messaging/messaging.service";
import { SpinnerService } from "./common/spinner/spinner.service";
import { ExcelExporterService } from "./common/exporter/excel-exporter.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JWTHttpInterceptor } from "./security/jwt-http-interceptor";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PdfExportService } from "./common/pdf/pdf-export.service";
import { PdfExporterComponent } from './misc/pdf-exporter/pdf-exporter.component';
import "@angular/compiler";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgmCoreModule } from "@agm/core";
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from "@angular/material/paginator";
import { VerfiyOTPComponent } from './misc/verfiy-otp/verfiy-otp.component';
import { NgOtpInputModule } from "ng-otp-input";
import { CreatePromotionComponent } from './dialogs/create-promotion/create-promotion.component';
import { AddAdminComponent } from './dialogs/add-admin/add-admin.component';

@NgModule({
  imports: [
    MdbCarouselModule,
    MatCheckboxModule,
    HttpClientModule,
    AppSharedModule,
    AppRoutingModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatMenuModule,
    ConfirmDialogModule,
    ToastModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    MatSliderModule,
    MatPaginatorModule,
    NgOtpInputModule,
  ],
  declarations: [
    TemplateComponent,
    EditAccountDialogComponent,
    LoginComponent,
    PdfExporterComponent,
    VerfiyOTPComponent,
    CreatePromotionComponent,
    AddAdminComponent,
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService,
    HttpService,
    LocalizationService,
    UserSessionService,
    RolePermissionService,
    LocalizationPipe,
    MessagingService,
    SpinnerService,
    ExcelExporterService,
    PdfExportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTHttpInterceptor,
      multi: true
    },
  ],
  exports: [
    AppRoutingModule,
    ConfirmDialogModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatMenuModule,
    ConfirmDialogModule,
    ToastModule,
    FlexLayoutModule,
    MatIconModule,
  ]

})
export class AppCoreModule { }
