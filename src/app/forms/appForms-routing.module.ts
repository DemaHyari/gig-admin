import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminControlComponent } from "../misc/admin-control/admin-control.component";
import { FormComponentCanDeactivateGuard } from "./FormComponentCanDeactivateGuard";


const routes: Routes = [
    { path: "admin", component: AdminControlComponent, pathMatch: "full" }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        FormComponentCanDeactivateGuard,
    ],
})
export class AppFormsRoutingModule { }