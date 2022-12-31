import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadCsvComponent } from './download-csv.component';

import { IconsModule } from '../../import-modules/icons.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmModule } from '../modal-confirm/modal-confirm.module';

@NgModule({
   declarations: [DownloadCsvComponent],
  imports: [
    CommonModule,
    IconsModule,
    MatButtonModule,
    MatTooltipModule,
    ModalConfirmModule,
    MatDialogModule

  ], exports: [DownloadCsvComponent]
})
export class DownloadCsvModule { }
