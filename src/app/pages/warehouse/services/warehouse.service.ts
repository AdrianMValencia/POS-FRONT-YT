import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  WarehouseByIdResponse,
  WarehouseResponse,
} from "../models/warehouse-response.interface";
import { WarehouseRequest } from "../models/warehouse-request.interface";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_WAREHOUSES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformWarehouseData(resp)));
  }

  private transformWarehouseData(response: BaseResponse): BaseResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((warehouse: WarehouseResponse) => {
      warehouse.badgeColor =
        badgeColors[warehouse.state] || "text-gray bg-gray-light";
      warehouse.icEdit = getIcon("icEdit", "Editar Almacen", true);
      warehouse.icDelete = getIcon("icDelete", "Eliminar Almacén", true);
    });

    return response;
  }

  warehouseById(warehouseId: number): Observable<WarehouseByIdResponse> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_BY_ID}${warehouseId}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  warehouseRegister(warehouse: WarehouseRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_REGISTER}`;
    return this._http.post<BaseResponse>(requestUrl, warehouse);
  }

  warehouseEdit(
    warehouseId: number,
    warehouse: WarehouseRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_EDIT}${warehouseId}`;

    return this._http.put<BaseResponse>(requestUrl, warehouse);
  }

  warehouseRemove(warehouseId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_REMOVE}${warehouseId}`;

    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
