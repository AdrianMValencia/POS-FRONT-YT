import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
import { environment as env } from "./../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { traducciones } from "../../../static-data/traductor";
import { formatDate } from "@angular/common";
import { downloadRequest } from "../../requests/download/download.request";

@Injectable({
  providedIn: "root",
})
export class DownloadXslxService {
  traduccion = traducciones;

  constructor(private http: HttpClient) {}

  post<T>(url: string, params: {}): Observable<any> {
    params = new downloadRequest(params);

    return this.http.post<any>(`${env.api}${url}`, params).pipe(
      map((data: any) => {
        console.log(data)
        return data;
      })
    );
  }

  download(data: any, filename: string, columnsFilter: any): void {
    let table = this.formatArray(data.items, columnsFilter);

    /* table id is passed over here */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(table);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    let now = new Date();
    let time = now.getTime();

    /* save to file */

    XLSX.writeFile(wb, env.filenameCsv + filename + "-" + time + ".xlsx");
  }

  formatArray(data: any, columnsFilter: any) {
    //  1. Ordenamos cabecera y filas
    var arr = typeof data != "object" ? JSON.parse(data) : data;

    let header = columnsFilter.map((column) => column.label);
    let result = [];

    result.push(header);

    for (var i = 0; i < arr.length; i++) {
      let row = [];

      columnsFilter.forEach((col) => {
        switch (col.type) {
          case "checkbox":
          case "button":
          case "clickButton":
          case "buttonGroup":
            break;
          default:
            row.push(this.parseFormat(arr[i][col.property], col.type));
        }
      });

      result.push(row);
    }
    return result;
  }

  parseFormat(dato: string, type) {
    if (dato != null) {
      switch (type) {
        case "periodo":
          dato = this.formatPeriodo(dato);
          break;
        case "datetime":
          dato = this.formatDateTime(dato);
          break;
        case "date":
          dato = this.formatDate(dato);
          break;
        case "currency":
          dato = this.formatCurrency(dato);
          break;
      }
      return dato;
    }

    dato = "-";
    return dato;
  }

  formatCurrency(currency: string) {
    return Number.parseFloat(currency).toFixed(2);
  }

  formatPeriodo(dato: string) {
    var date = new Date(Date.parse(String(dato)));
    return (dato = formatDate(date, "YYYY-MM", "es-ES", "-0500"));
  }

  formatDate(dato: string) {
    if (dato) {
      if (dato.length >= 10) {
        if (
          dato[4] == "-" &&
          dato[7] == "-" &&
          (dato[10] == " " || dato[10] == "T")
        ) {
          var date = new Date(Date.parse(String(dato)));
          return (dato = formatDate(date, "dd-MM-YYYY", "es-ES", "-0500"));
        }
      }
    }

    return dato;
  }

  formatDateTime(dato: string) {
    if (dato) {
      if (dato.length >= 10) {
        if (
          dato[4] == "-" &&
          dato[7] == "-" &&
          (dato[10] == " " || dato[10] == "T")
        ) {
          var date = new Date(Date.parse(String(dato)));
          return (dato = formatDate(
            date,
            "dd-MM-YYYY hh:mm:ss a",
            "es-ES",
            "-0500"
          ));
        }
      }
    }

    return dato;
  }

  getHeader(firstRowApi, columnsFilter) {
    let headersFilter = columnsFilter.map((column) => column.property);
    console.log(headersFilter);
    let headers = [];

    for (var columnNameApi in firstRowApi) {
      if (headersFilter.includes(columnNameApi)) {
        let columnName = this.traducir(String(columnNameApi));
        if (columnName != "") {
          headers.push(columnName);
        }
      }
    }

    return headers;
  }

  traducir(value: string): string {
    const res = this.traduccion.find((e) => e.api == value);
    if (res) {
      value = res.header;
    } else {
      value = "";
    }

    return value;
  }
}