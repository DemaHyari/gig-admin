import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { TemplateComponent } from "./layout/template/template.component";
import { AuthGuardService } from "./security/auth-guard.service";
import { LoginComponent } from "./misc/login/login.component";
import { PdfExporterComponent } from "./misc/pdf-exporter/pdf-exporter.component";
import { NgModule } from "@angular/core";
import { VerfiyOTPComponent } from "./misc/verfiy-otp/verfiy-otp.component";
const appRoutes: Routes = [
  {
    path: "app",
    component: TemplateComponent,
    children: [
      {
        path: "views",
        loadChildren: () => import('./views/appViews.module').then(m => m.AppViewsModule)
      },
      { path: "forms", loadChildren: () => import('./forms/appForms.module').then(m => m.AppFormsModule) },
      { path: "", redirectTo: "/app/views/dashboard", pathMatch: "full" }
    ],
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService]
  },
  { path: "app/misc/pdf", component: PdfExporterComponent, pathMatch: "full" },
  { path: "loginView", component: LoginComponent, pathMatch: "full" },
  { path: "verfication", component: VerfiyOTPComponent, pathMatch: "full" },
  { path: "**", redirectTo: "app", pathMatch: "full" },
  { path: "", redirectTo: "app", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
  ]
})
export class AppRoutingModule { }
