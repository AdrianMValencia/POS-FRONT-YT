import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxSimpleComponent } from './search-box-simple.component';

import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SearchBoxSimpleComponent],
  imports: [
    CommonModule,
    IconModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ], exports: [SearchBoxSimpleComponent]
})
export class SearchBoxSimpleModule { }
