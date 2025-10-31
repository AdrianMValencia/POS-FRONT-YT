import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { getIcon } from '@shared/functions/helpers';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { UserByIdResponse, UserResponse } from '../models/user-response.interface';
import { UserRequest } from '../models/user-request.interface';
import { AlertService } from '@shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _alert: AlertService) { }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LIST_USERS
      }?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1
      }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformUserData(resp)));
  }

  private transformUserData(response: BaseResponse): BaseResponse {
    const badgeColor: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((user: UserResponse) => {
      user.badgeColor =
        badgeColor[user.state] || "text-gray bg-gray-light";
      user.icEdit = getIcon("icEdit", "Editar usuario", true);
      user.icDelete = getIcon("icDelete", "Eliminar usuario", true);
    });

    return response;
  }

  userById(userId: number): Observable<UserByIdResponse> {
    const requestUrl = `${env.api}${endpoint.USER_BY_ID}${userId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    )
  }

  userRegister(user: UserRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_REGISTER}`;
    const formDataUser = this._buildFormDataUser(user);
    return this._http.post<BaseResponse>(requestUrl, formDataUser);
  }

  userEdit(userId: number, user: UserRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_EDIT}${userId}`;
    user.password = '';
    const formDataUser = this._buildFormDataUser(user);
    return this._http.put<BaseResponse>(requestUrl, formDataUser);
  }

  userRemove(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.USER_REMOVE}${userId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    )
  }

  private _buildFormDataUser(user: UserRequest): FormData {
    const formData = new FormData();
    formData.append("userName", user.userName),
      formData.append("password", user.password),
      formData.append("email", user.email),
      formData.append("image", user.image),
      formData.append("authType", user.authType),
      formData.append("state", user.state.toString())

    return formData;
  }
}
