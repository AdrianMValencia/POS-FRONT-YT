import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { SharedModule } from '@shared/shared.module';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleManageComponent } from './components/role-manage/role-manage.component';
import { RoleRoutingModule } from './role-routing.module';
import { CheckboxComponent } from '@shared/components/reusables/checkbox/checkbox.component';


@NgModule({
  declarations: [
    RoleListComponent,
    RoleManageComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    CheckboxComponent
  ]
})
export class RoleModule { }
