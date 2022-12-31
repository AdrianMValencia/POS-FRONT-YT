import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableMenuComponent } from './list-table-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    ListTableMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    MatIconModule,
    MatRippleModule,
    FlexLayoutModule
  ],
  exports: [ListTableMenuComponent]
})
export class ListTableMenuModule { }
