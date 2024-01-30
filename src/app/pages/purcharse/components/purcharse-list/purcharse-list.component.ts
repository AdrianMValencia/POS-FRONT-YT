import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { PurcharseService } from "../../services/purcharse.service";
import { componentSettings } from "./purcharse-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import { PurcharseResponse } from "../../models/purcharse-response.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-purcharse-list",
  templateUrl: "./purcharse-list.component.html",
  styleUrls: ["./purcharse-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class PurcharseListComponent implements OnInit {
  component;
  constructor(
    customTitle: CustomTitleService,
    public _purcharseService: PurcharseService,
    private _router: Router
  ) {
    customTitle.set("Compras");
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

  rowClick(rowClick: RowClick<PurcharseResponse>) {
    let action = rowClick.action;
    let purcharse = rowClick.row;

    switch (action) {
      case "viewDetail":
        this.purcharseViewDetail(purcharse);
        break;
      case "cancel":
        this.purcharseCancel(purcharse);
        break;
    }

    return false;
  }

  purcharseViewDetail(purcharse: PurcharseResponse) {
    this._router.navigate(["/proceso-compras/crear", purcharse.purcharseId]);
  }

  purcharseCancel(purcharse: PurcharseResponse) {
    Swal.fire({
      title: `Se anulará de forma permanente`,
      text: "¿Realmente deseas anular la Compra?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._purcharseService
          .purcharseCancel(purcharse.purcharseId)
          .subscribe(() => this.setGetInputsPurcharse(true));
      }
    });
  }

  setGetInputsPurcharse(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Purcharse?Download=True`;
  }

  newPurcharse() {
    this._router.navigate(["/proceso-compras/crear"]);
  }
}
