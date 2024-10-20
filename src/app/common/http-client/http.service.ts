import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private backendServiceURL: string;

  constructor(private http: HttpClient) { }

  init() {
    console.log("Initializing http service");
    return this.http
      .get("assets/config.json")
      .toPromise()
      .then((data: any) => {
        this.backendServiceURL = data.backendServiceURL;
        console.log("Http service initialized successfully", this.backendServiceURL);
        return Promise.resolve();
      })
      .catch((err: any) => {
        return Promise.reject("Failed to initialize Http service");
      });
  }

  sendGetRequest(url: string, queryParams?: any, observeResponse?: boolean): Observable<any> {
    var httpParams = this.convertObjectToHttpParams(queryParams);
    console.log("sending GET " + this.backendServiceURL + url);
    if (observeResponse) {
      return this.http.get(this.backendServiceURL + url, { params: httpParams, observe: "response" });
    } else {
      return this.http.get(this.backendServiceURL + url, { params: httpParams });
    }
  }

  sendDeleteRequest(url: string, queryParams?: any): Observable<any> {
    var httpParams = this.convertObjectToHttpParams(queryParams);
    console.log("sending DELETE " + this.backendServiceURL + url);
    return this.http.delete(this.backendServiceURL + url, { params: httpParams });
  }

  sendPutRequest(url: string, data?: any): Observable<any> {
    console.log("sending PUT " + this.backendServiceURL + url);
    console.log("sending PUT data" + data);
    return this.http.put(this.backendServiceURL + url, data);
  }

  sendPostRequest(url: string, data?: any, observeResponse?: boolean): Observable<any> {
    console.log("sending POST " + this.backendServiceURL + url);
    console.log(data);

    if (observeResponse) {
      return this.http.post(this.backendServiceURL + url, data, { observe: "response" });
    } else {
      return this.http.post(this.backendServiceURL + url, data);
    }
  }

  private convertObjectToHttpParams(queryParams: any): HttpParams {
    var httpParams = new HttpParams();
    if (!queryParams) {
      return httpParams;
    }
    for (let key in queryParams) {
      var value = queryParams[key];
      if (value == null) {
        continue;
      }
      httpParams = httpParams.set(key, value);
    }
    return httpParams;
  }

  getBackendServiceURL() {
    return this.backendServiceURL;
  }
  getFiles(url: string, queryParams?: any, observeResponse?: boolean): Observable<Blob> {
    var httpParams = this.convertObjectToHttpParams(queryParams);
    return this.http.get('https://gig-storage.azurewebsites.net/api/' + url, { responseType: 'blob' });
  }
  postfiles(url: string, data?: any, observeResponse?: boolean): Observable<Blob> {
    console.log("sending POST " + 'https://gig-storage.azurewebsites.net/api/' + url);
    console.log(data);
    return this.http.post('https://gig-storage.azurewebsites.net/api/' + url, data, { responseType: 'blob' })
  }
}
// this.http.get('http://localhost:8080/links/all', {
// headers: new HttpHeaders().set('Authorization', headers)
//     })
