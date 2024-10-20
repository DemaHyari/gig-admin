import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserSessionService } from './user-session.service';

@Directive({
  selector: '[appElementPermission]'
})
export class ElementPermissionDirective implements OnInit {

  @Input('renderedForRoles') renderedForRoles: string;
  @Input('removedForRoles') removedForRoles: string;
  @Input('visibleForRoles') visibleForRoles: string;
  @Input('hiddenForRoles') hiddenForRoles: string;


  constructor(private element: ElementRef, private userSessionService: UserSessionService) {
  }

  ngOnInit(): void {
    var userRole = this.userSessionService.getLoggedInUser().role;
    if (!userRole) {
      return;
    }
    this.applyRenderedForRoles(userRole)
    this.applyRemovedForRoles(userRole);
    this.applyVisibleForRoles(userRole);
    this.applyHiddenForRoles(userRole);
  }

  applyRenderedForRoles(userRole) {
    if (!this.renderedForRoles) {
      return;
    }
    let rolesArray = this.renderedForRoles.split(",");
    if (rolesArray.indexOf(userRole) == -1)
      this.element.nativeElement.style.display = "none";
  }

  applyRemovedForRoles(userRole) {
    if (!this.removedForRoles) {
      return;
    }
    let rolesArray = this.removedForRoles.split(",");
    if (rolesArray.indexOf(userRole) != -1)
      this.element.nativeElement.style.display = "none";
  }

  applyVisibleForRoles(userRole) {
    if (!this.visibleForRoles) {
      return;
    }
    let rolesArray = this.visibleForRoles.split(",");
    if (rolesArray.indexOf(userRole) == -1)
      this.element.nativeElement.style.visibility = "hidden";
  }

  applyHiddenForRoles(userRole) {
    if (!this.hiddenForRoles) {
      return;
    }
    let rolesArray = this.hiddenForRoles.split(",");
    if (rolesArray.indexOf(userRole) != -1)
      this.element.nativeElement.style.visibility = "hidden";
  }


}