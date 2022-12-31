import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './modal-confirm.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IconsModule } from '../../import-modules/icons.module';
import { LayoutModule } from '../../import-modules/layout.module';

@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatDialogModule,
    MatButtonModule,
    IconsModule
  ]
})
export class ModalConfirmModule { }