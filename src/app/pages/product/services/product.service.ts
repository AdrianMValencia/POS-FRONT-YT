import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  ProductByIdResponse,
  ProductResponse,
} from "../models/product-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { ProductRequest } from "../models/product-request.interface";
import { ProductStockWarehouseResponse } from "../models/product-stock-warehouse-response.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformProductData(resp)));
  }

  private transformProductData(response: BaseResponse): BaseResponse {
    const badgeColor: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((product: ProductResponse) => {
      product.badgeColor =
        badgeColor[product.state] || "text-gray bg-gray-light";
      product.icView = getIcon("icVisibility", "Ver stock actual", true);
      product.icEdit = getIcon("icEdit", "Editar Producto", true);
      product.icDelete = getIcon("icDelete", "Eliminar Producto", true);
    });

    return response;
  }

  productById(productId: number): Observable<ProductByIdResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_BY_ID}${productId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  productRegister(product: ProductRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_REGISTER}`;
    const formDataProduct = this._builFormDataProduct(product);
    return this._http.post<BaseResponse>(requestUrl, formDataProduct);
  }

  productEdit(
    productId: number,
    product: ProductRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_EDIT}${productId}`;
    const formDataProduct = this._builFormDataProduct(product);
    return this._http.put<BaseResponse>(requestUrl, formDataProduct);
  }

  productRemove(productId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_REMOVE}${productId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  productStockByWarehouse(
    productId: number
  ): Observable<ProductStockWarehouseResponse[]> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_STOCK_WAREHOUSE}${productId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  private _builFormDataProduct(product: ProductRequest): FormData {
    const formData = new FormData();
    formData.append("code", product.code),
      formData.append("name", product.name),
      formData.append("stockMin", product.stockMin.toString()),
      formData.append("stockMax", product.stockMax.toString()),
      formData.append("categoryId", product.categoryId.toString()),
      formData.append("state", product.state.toString()),
      formData.append("image", product.image),
      formData.append("unitSalePrice", product.unitSalePrice.toString());

    return formData;
  }
}
