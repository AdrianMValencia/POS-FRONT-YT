import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SaleRoutingModule } from "./sale-routing.module";
import { SaleListComponent } from "./components/sale-list/sale-list.component";
import { SaleCreateComponent } from "./components/sale-create/sale-create.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { SelectAutocompleteComponent } from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";

@NgModule({
  declarations: [SaleListComponent, SaleCreateComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
    SharedModule,
    ListTableComponent,
    MenuComponent,
    SearchBoxMultipleComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent,
  ],
})
export class SaleModule {}
