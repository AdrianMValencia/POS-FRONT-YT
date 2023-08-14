import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconsModule } from "@shared/import-modules/icons.module";
import { DownloadXslxService } from "@shared/services/download-xslx.service";
import { IconsService } from "@shared/services/icons.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: "app-export-excel",
  standalone: true,
  imports: [CommonModule, IconsModule, MatButtonModule, MatTooltipModule],
  templateUrl: "./export-excel.component.html",
  styleUrls: ["./export-excel.component.scss"],
})
export class ExportExcelComponent implements OnInit {
  icCloudDownload = IconsService.prototype.getIcon("icCloudDownload");

  @Input() url: string = null;
  @Input() getInputs: string = null;
  @Input() filename: string = null;

  infoTooltip = "Descargar resultados en formato Excel.";

  constructor(
    public _downloadXslxService: DownloadXslxService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  download() {
    Swal.fire({
      title: "Confirmar",
      text: "Esta acción descargará los registros en formato .xlsx ignorando la paginación.",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDownload();
      }
    });
  }

  executeDownload() {
    this._spinner.show();
    this._downloadXslxService
      .executeDownload(this.url + this.getInputs)
      .subscribe((excelData: Blob) => {
        const filename = this.filename;
        const blobUrl = URL.createObjectURL(excelData);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = filename;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);

        this._spinner.hide();
      });
  }
}
