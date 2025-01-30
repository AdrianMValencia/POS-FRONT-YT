import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { SaleService } from "../../services/sale.service";
import { Router } from "@angular/router";
import { componentSettings } from "./sale-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { RowClick } from "@shared/models/row-click.interface";
import { SaleResponse } from "../../models/sale-response.interface";

@Component({
  selector: "vex-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class SaleListComponent implements OnInit {
  component;
  constructor(
    customTitle: CustomTitleService,
    public _saleService: SaleService,
    private _router: Router
  ) {
    customTitle.set("Ventas");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  rowClick(rowClick: RowClick<SaleResponse>) {
    let action = rowClick.action;
    let sale = rowClick.row;

    return false;
  }

  setGetInputsSale(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Sale?Download=True`;
  }

  newSale() {
    this._router.navigate(["/proceso-ventas/crear"]);
  }
}
