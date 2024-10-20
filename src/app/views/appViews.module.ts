import { NgModule } from "@angular/core";
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ViewComponent } from "./view.component";
import { DashboardComponent } from "../misc/dashboard/dashboard.component";
import { LocalizedViewPaginator } from "./LocalizedViewPaginator";
import { TranslateService } from "@ngx-translate/core";
import { AppSharedModule } from "../appShared.module";
import { AppViewsRoutingModule } from "./appViews-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { AccessPrivilageComponent } from './access-privilage/access-privilage.component';
import { TableModule } from 'primeng/table';
import { MessageStatusComponent } from './message-status/message-status.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { PromotionComponent } from './promotion/promotion.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UsersComponent } from './users/users.component';
@NgModule({
  imports: [
    AppSharedModule,
    AppViewsRoutingModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    TableModule,
    InputSwitchModule
  ],
  declarations: [
    DashboardComponent,
    ViewComponent,
    AccessPrivilageComponent,
    MessageStatusComponent,
    ComplaintComponent,
    PromotionComponent,
    UsersComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: LocalizedViewPaginator,
      deps: [TranslateService]
    },
  ],
  exports: [

  ]
})
export class AppViewsModule { }
