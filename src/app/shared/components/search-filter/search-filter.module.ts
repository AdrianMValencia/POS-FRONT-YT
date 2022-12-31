import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '../../import-modules/forms.module';
import { LayoutModule } from '../../import-modules/layout.module';
import { IconsModule } from '../../import-modules/icons.module';

import { SearchFilterComponent } from './search-filter.component';


@NgModule({
  declarations: [SearchFilterComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    LayoutModule,
    IconsModule
  ], exports: [SearchFilterComponent]
})
export class SearchFilterModule { }
