import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { SharedModule } from "@shared/shared.module";
import { ProviderRoutingModule } from "./provider-routing.module";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";
import { ProviderManageComponent } from "./components/provider-manage/provider-manage.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";

@NgModule({
  declarations: [ProviderListComponent, ProviderManageComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
  ],
})
export class ProviderModule {}
