import { Injectable } from "@angular/core";
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { HttpService } from "../common/http-client/http.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class UserSessionService {
  username: string = '';
  constructor(private httpService: HttpService, private translateService: TranslateService) { }

  init() {
    console.log("Initializing user session service");
    if (!this.getLoginToken()) {
      console.log("User session service initialzed successfully");
      return Promise.resolve();
    } else {
      return this.refershLoginToken().then(
        data => {
          console.log("User session service initialzed successfully");
          return Promise.resolve();
        },
        error => {
          return Promise.resolve("Failed to initialize user session service");
        }
      );
    }
  }

  authenticateUser(username, otp) {
    return new Promise<void>((resolve, reject) => {
      this.httpService.sendPostRequest("api/Authentication/AdminUserLogin", { username: username, verificationCode: otp }, true).subscribe(
        r => {
          console.log("🚀 ~ file: user-session.service.ts:33 ~ UserSessionService ~ authenticateUser ~ r", r)
          const res = JSON.parse(JSON.stringify(r))
          let jwtToken = res.body.result.accessToken;
          this.storeLoginToken(jwtToken);
          if (this.isValidLoginToken()) {
            this.storelanguage(res.body.result.language)
            this.translateService.use(res.body.result.language);
            resolve();
          }
          reject("INVALID_TOKEN");
        },
        error => {
          console.log(error);
          reject(error.error);
        }
      );
    });
  }

  refershLoginToken() {
    return new Promise<void>((resolve, reject) => {
      let jwtToken = this.getLoginToken();
      this.storeLoginToken(jwtToken);
      if (this.isValidLoginToken()) {
        this.translateService.use(this.getLanguage());
        resolve();
      }
      reject("INVALID_TOKEN");
    });
  }

  storeLoginToken(jwtToken) {
    localStorage.setItem("jwt-token", jwtToken);
  }
  getLoginToken() {
    return localStorage.getItem("jwt-token");
  }
  removeLoginToken() {
    localStorage.removeItem("jwt-token");
  }

  storelanguage(lang) {
    localStorage.setItem("lang", lang);
  }
  getLanguage() {
    return localStorage.getItem("lang");
  }
  removeLanguage() {
    localStorage.removeItem("lang");
  }

  isValidLoginToken(): boolean {
    var jwtToken = this.getLoginToken();
    if (!jwtToken) {
      return false;
    }
    type customJwtPayload = JwtPayload & { enabled: string };
    var jwtData = jwt_decode<customJwtPayload>(jwtToken);
    if (jwtData.exp <= new Date().getTime() / 1000) {
      return false;
    }
    return true;
  }

  getLoggedInUser() {
    let jwtTokenClaims: any = {};

    var jwtToken = this.getLoginToken();
    if (!jwtToken) {
      return {};
    }
    type customJwtPayload = JwtPayload & {
      //enabled: string,
      //languageId : string,
      role: []
    };
    jwtTokenClaims = jwt_decode<customJwtPayload>(jwtToken);
    return jwtTokenClaims;
  }
  setUsername(username: string) {
    this.username = username;
  }
  getUsername() {
    return this.username
  }
}
