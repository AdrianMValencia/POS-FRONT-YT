import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerModule } from '../../../@vex/directives/container/container.module';
import { ScrollbarModule } from '../../../@vex/components/scrollbar/scrollbar.module';
import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports: [
    FlexLayoutModule,
    ContainerModule,
    ScrollbarModule,
    PageLayoutModule,
    MatDividerModule,
    MatMenuModule
  ]
})
export class LayoutModule { }
