import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
