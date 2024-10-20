import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { FormComponent } from "./form.component";

import { CheckboxModule } from "primeng/checkbox";
import { AdminControlComponent } from "../misc/admin-control/admin-control.component";
import { AppSharedModule } from "../appShared.module";
import { AppFormsRoutingModule } from "./appForms-routing.module";
import { AppFieldsModule } from "../fields/appFields.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    AppSharedModule,
    AppFormsRoutingModule,
    AppFieldsModule,

    MatInputModule,
    MatButtonModule,
    MatCardModule,

    MatSelectModule,
    MatTabsModule,
    CheckboxModule,
    MatExpansionModule,
    FlexLayoutModule
  ],
  declarations: [
    FormComponent,
    AdminControlComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class AppFormsModule { }
