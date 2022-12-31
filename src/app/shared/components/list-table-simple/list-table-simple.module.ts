import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableSimpleComponent } from './list-table-simple.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

import { ScrollbarModule } from '../../../../@vex/components/scrollbar/scrollbar.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NgxSpinnerModule } from "ngx-spinner";

import {IconsModule} from '../../import-modules/icons.module';
import { ByteConversionPipe } from 'src/app/pipes/byte-conversion.pipe';

@NgModule({
  declarations: [ListTableSimpleComponent, ByteConversionPipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    ScrollbarModule,
    PageLayoutModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    IconsModule
  ],
  exports: [ListTableSimpleComponent]
})
export class ListTableSimpleModule { }
