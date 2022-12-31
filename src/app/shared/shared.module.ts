import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './import-modules/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ListTableModule } from './components/list-table/list-table.module';
import { ListTableMenuModule } from './components/list-table-menu/list-table-menu.module';
import { ListTableSimpleModule } from './components/list-table-simple/list-table-simple.module';
import { SearchBoxModule } from './components/search-box/search-box.module';
import { SearchFilterModule } from './components/search-filter/search-filter.module';
import { DownloadCsvModule } from './components/download-csv/download-csv.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    IconModule,
    ContainerModule,
    ScrollbarModule,
    FlexLayoutModule,
    PageLayoutModule,
    ListTableModule,
    ListTableMenuModule,
    ListTableSimpleModule,
    SearchBoxModule,
    SearchFilterModule,
    DownloadCsvModule,
    NgxSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ]
})
export class SharedModule { }
