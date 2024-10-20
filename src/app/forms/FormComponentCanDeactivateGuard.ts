import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { AbstractFormComponent } from "./AbstractFormComponent";

@Injectable()
export class FormComponentCanDeactivateGuard implements CanDeactivate<AbstractFormComponent> {
  canDeactivate(component: AbstractFormComponent): boolean {
    if (!component.canDeactivate()) {
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
