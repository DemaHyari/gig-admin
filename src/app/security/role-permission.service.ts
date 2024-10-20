import { Injectable } from '@angular/core';
import { UserSessionService } from './user-session.service';
import { MessagingService } from '../common/messaging/messaging.service';

@Injectable()
export class RolePermissionService {

  commonRoutes = ["", "app", "login", "register", "aboutUs", "products", "offers", "contactUs", "cart", "favorite"];
  rolesList = ["ROLE_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_CUSTOMERS_SERVICE", "SuperAdmin"];
  rolesAccessibleRoutes = {
    ROLE_ADMIN: [],
    ROLE_BRANCH_MANAGER: ["views", "forms", "dashboard", "categories", "products"],
    ROLE_CUSTOMERS_SERVICE: ["views", "forms", "dashboard"],
    SuperAdmin: []
  };

  constructor(private userSessionService: UserSessionService, private messagingService: MessagingService) { }

  isAccessibleRoute(route) {
    for (let accessibleRoute of this.commonRoutes) {
      if (route == accessibleRoute) {
        return true;
      }
    }
    var userRole = this.userSessionService.getLoggedInUser().role;
    if (!userRole || !this.rolesAccessibleRoutes[userRole]) {
      return false;
    }
    var roleRoutes = this.rolesAccessibleRoutes[userRole];
    if (roleRoutes.length == 0) {
      return true;
    }
    for (let accessibleRoute of roleRoutes) {
      if (route == accessibleRoute) {
        return true;
      }
    }
    this.messagingService.addErrorMessage("messages.page_is_accessible_message");
    return false;
  }
}
