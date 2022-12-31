import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports: [
    IconModule,
    MatIconModule
  ]
})
export class IconsModule { }
