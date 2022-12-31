import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';

import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    IconModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule { }
