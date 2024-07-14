import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  ClientById,
  ClientResponse,
} from "../models/client-response-interface";
import { getIcon } from "@shared/functions/helpers";
import { ClientRequest } from "../models/client-request.interface";
import { AlertService } from "@shared/services/alert.service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CLIENTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformClientData(resp)));
  }

  private transformClientData(response: BaseResponse): BaseResponse {
    const badgeColor: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((client: ClientResponse) => {
      client.badgeColor = badgeColor[client.state] || "text-gray bg-gray-light";
      client.icEdit = getIcon("icEdit", "Editar Cliente", true);
      client.icDelete = getIcon("icDelete", "Eliminar Cliente", true);
    });

    return response;
  }

  clientById(clientId: number): Observable<ClientById> {
    const requestUrl = `${env.api}${endpoint.CLIENT_BY_ID}${clientId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  clientRegister(client: ClientRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CLIENT_REGISTER}`;
    return this._http.post<BaseResponse>(requestUrl, client);
  }

  clientEdit(
    clientId: number,
    client: ClientRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CLIENT_EDIT}${clientId}`;
    return this._http.put<BaseResponse>(requestUrl, client);
  }

  clientRemove(clientId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CLIENT_REMOVE}${clientId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
