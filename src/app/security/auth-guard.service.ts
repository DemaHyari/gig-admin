import { Injectable } from "@angular/core";
import { Router, CanActivateChild, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { UserSessionService } from "./user-session.service";
import { RolePermissionService } from "./role-permission.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private rolePermissionService: RolePermissionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userSessionService.isValidLoginToken()) {
      this.router.navigate(["/loginView"]);
      return false;
    }
    if (!this.rolePermissionService.isAccessibleRoute(next.routeConfig.path)) {
      return false;
    }
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }
}
