import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentType } from "@shared/models/document-type.interface";
import { environment as env } from "src/environments/environment";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DocumentTypeService {
  constructor(private _http: HttpClient) {}

  listDocumentTypes(): Observable<DocumentType[]> {
    const requestUrl = `${env.api}${endpoint.LIST_DOCUMENT_TYPES}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }
}
