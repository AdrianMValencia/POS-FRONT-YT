import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ProductDetailsResponse } from "../../purcharse/models/purcharse-response.interface";
import { getIcon } from "@shared/functions/helpers";

@Injectable({
  providedIn: "root",
})
export class SaleDetailService {
  constructor(private _http: HttpClient) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.PRODUCT_STOCK_WAREHOUSE_ID
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(map((resp) => this.transformProductsData(resp)));
  }

  private transformProductsData(response: BaseResponse) {
    response.data.forEach((pro: ProductDetailsResponse) => {
      pro.icAdd = getIcon('icAdd', 'Agregar producto al detalle', true);
      pro.quantity = 0;
      pro.totalAmount = 0;
    });

    return response;
  }
}
