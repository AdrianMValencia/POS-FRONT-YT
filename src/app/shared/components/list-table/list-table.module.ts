import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollbarModule } from '../../../../@vex/components/scrollbar/scrollbar.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ListTableComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
    NgxSpinnerModule,
    ScrollbarModule,
    PageLayoutModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule,
    MatTooltipModule,
    IconModule,
    MatIconModule
  ],
  exports: [ListTableComponent]
})
export class ListTableModule { }
