import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { SaleResponse } from "../models/sale-response.interface";
import { getIcon } from "@shared/functions/helpers";

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
}
