import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  PurcharseByIdResponse,
  PurcharseResponse,
} from "../models/purcharse-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { PurcharseRequest } from "../models/purcharse-request.interface";

@Injectable({
  providedIn: "root",
})
export class PurcharseService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PURCHARSES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformPurcharseData(resp)));
  }

  private transformPurcharseData(response: BaseResponse): BaseResponse {
    response.data.forEach((purcharse: PurcharseResponse) => {
      purcharse.icVisibility = getIcon(
        "icVisibility",
        "Ver Detalle de Compra",
        true
      );
      purcharse.icCancel = getIcon("icCancel", "Anular Compra", true);
    });

    return response;
  }

  purcharseById(purcharseId: number): Observable<PurcharseByIdResponse> {
    const requestUrl = `${env.api}${endpoint.PURCHARSE_BY_ID}${purcharseId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  purcharseRegister(purcharse: PurcharseRequest) {
    const requestUrl = `${env.api}${endpoint.PURCHARSE_REGISTER}`;
    return this._http.post<BaseResponse>(requestUrl, purcharse);
  }

  purcharseCancel(purcharseId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PURCHARSE_CANCEL}${purcharseId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
