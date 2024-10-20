import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from 'rxjs';
import { UserSessionService } from "./user-session.service";

@Injectable()
export class JWTHttpInterceptor implements HttpInterceptor {
  constructor(private userSessionService: UserSessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userSessionService.isValidLoginToken()) {
      const jwtToken = 'Bearer ' + this.userSessionService.getLoginToken();
      const cloned = req.clone({
        headers: req.headers.set("Authorization", jwtToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
