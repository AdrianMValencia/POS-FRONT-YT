import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IconModule } from "@visurel/iconify-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { ScrollbarModule } from "src/@vex/components/scrollbar/scrollbar.module";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { ListTableSimpleModule } from "./components/list-table-simple/list-table-simple.module";
import { SearchFilterModule } from "./components/search-filter/search-filter.module";
import { MaterialModule } from "./import-modules/material.module";

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    IconModule,
    ContainerModule,
    ScrollbarModule,
    FlexLayoutModule,
    PageLayoutModule,
    ListTableSimpleModule,
    SearchFilterModule,
    NgxSpinnerModule,
  ],
})
export class SharedModule {}
