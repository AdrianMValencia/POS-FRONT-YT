import { Component, Input, OnInit } from '@angular/core';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DownloadXslxService } from '../../services/download-xslx.service';

// import * as XLSX from 'xlsx'; 

@Component({
    selector: 'vex-download-csv',
    templateUrl: './download-csv.component.html',
    styleUrls: ['./download-csv.component.scss']
})
export class DownloadCsvComponent implements OnInit {

    icCloudDownload = icCloudDownload

    @Input() url: string = null;
    @Input() columnsFilter: [] = [];
    @Input() getInputs: string = null;
    @Input() filename: string = '';

    constructor(
        public downloadXslxService: DownloadXslxService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
    }

    download() {

        this.dialog.open(ModalConfirmComponent, {
            width: '320px',
            data: {
                "title": "Confirmar",
                "text": "Esta acción descargará total de registros en formato .xlsx ignorando la paginación.",
                "button": "DESCARGAR"
            }
        }).afterClosed().subscribe(result => {

            if (result) {
                this.executeDownload();
            }

        });

    }

    executeDownload() {

        this.spinner.show();
        
        this.downloadXslxService.post(this.url, this.getInputs)
            .subscribe(
                async res => {

                    this.downloadXslxService.download(res.data, this.filename, this.columnsFilter)
                    this.spinner.hide();

                }
            )
        

    }

}
