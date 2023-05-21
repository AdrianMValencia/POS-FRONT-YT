import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login.interface";
import { Observable, BehaviorSubject } from "rxjs";
import { environment as env } from "src/environments/environment";
import { endpoint, httpOptions } from "@shared/apis/endpoint";
import { map } from "rxjs/operators";
import { ApiResponse } from "src/app/commons/response.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: BehaviorSubject<ApiResponse>;

  public get userToken(): ApiResponse {
    return this.user.value;
  }

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<ApiResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
  }

  login(req: Login, authType: string): Observable<ApiResponse> {
    localStorage.setItem("authType", "Interno");
    const requestUrl = `${env.api}${endpoint.LOGIN}?authType=${authType}`;
    return this.http.post<ApiResponse>(requestUrl, req, httpOptions).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          localStorage.setItem("token", JSON.stringify(resp.data));
          this.user.next(resp.data);
        }

        return resp;
      })
    );
  }

  loginWithGoogle(
    credential: string,
    authType: string
  ): Observable<ApiResponse> {
    localStorage.setItem("authType", "Externo");
    const requestUrl = `${env.api}${endpoint.LOGIN_GOOGLE}?authType=${authType}`;
    return this.http
      .post<ApiResponse>(requestUrl, JSON.stringify(credential), httpOptions)
      .pipe(
        map((resp: ApiResponse) => {
          if (resp.isSuccess) {
            localStorage.setItem("token", JSON.stringify(resp.data));
            this.user.next(resp.data);
          }

          return resp;
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    this.user.next(null);
    window.location.reload();
  }
}
