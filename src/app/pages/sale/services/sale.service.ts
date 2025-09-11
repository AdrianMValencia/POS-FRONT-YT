import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  SaleByIdResponse,
  SaleResponse,
} from "../models/sale-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { SaleRequest } from "../models/sale-request.interface";

@Injectable({
  providedIn: "root",
})
export class SaleService {
  constructor(private _http: HttpClient, private _alertService: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_SALES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformSaleData(resp)));
  }

  private transformSaleData(response: BaseResponse): BaseResponse {
    const badgeColor: Record<string, string> = {
      BOLETA: "text-am-main-blue-dark bg-am-main-blue-light",
      FACTURA: "text-am-new-green-dark bg-am-new-green-light",
    };

    response.data.forEach((sale: SaleResponse) => {
      sale.badgeColor =
        badgeColor[sale.voucherDescription] || "text-gray bg-gray-light";
      sale.icView = getIcon("icVisibility", "Ver detalle de venta", true);
      sale.icInvoice =
        sale.voucherDescription === "FACTURA"
          ? getIcon("icInvoice", "Exportar factura", true)
          : getIcon("icTicket", "Exportar boleta", true);
      sale.icCancel = getIcon("icCancel", "Anular venta", true);
    });

    return response;
  }

  saleById(saleId: number): Observable<SaleByIdResponse> {
    const requestUrl = `${env.api}${endpoint.SALE_BY_ID}${saleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  saleRegister(sale: SaleRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.SALE_REGISTER}`;
    return this._http.post<BaseResponse>(requestUrl, sale);
  }

  saleCancel(saleId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.SALE_CANCEL}${saleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alertService.success("Excelente", resp.message);
        }
      })
    );
  }

  saleExportToPdfSaleDetail(saleId: number): Observable<Blob> {
    const requestUrl = `${env.api}${endpoint.SALE_EXPORT_PDF}${saleId}`;
    return this._http.get(requestUrl, { responseType: "blob"});
  }
}
