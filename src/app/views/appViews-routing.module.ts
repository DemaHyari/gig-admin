import { MessageStatusComponent } from './message-status/message-status.component';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../misc/dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { AccessPrivilageComponent } from "./access-privilage/access-privilage.component";
import { ComplaintComponent } from './complaint/complaint.component';
import { PromotionComponent } from './promotion/promotion.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, pathMatch: "full" },
  { path: "accessPrivilage", component: AccessPrivilageComponent, pathMatch: "full" },
  { path: "messageStatus", component: MessageStatusComponent, pathMatch: "full" },
  { path: "complaints", component: ComplaintComponent, pathMatch: "full" },
  { path: "promotion", component: PromotionComponent, pathMatch: "full" },
  { path: "users", component: UsersComponent, pathMatch: "full" }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppViewsRoutingModule { }
