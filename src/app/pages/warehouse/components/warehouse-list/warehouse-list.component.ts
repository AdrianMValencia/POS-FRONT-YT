import { Component, OnInit } from "@angular/core";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { WarehouseService } from "../../services/warehouse.service";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { componentSettings } from "./warehouse-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { WarehouseManageComponent } from "../warehouse-manage/warehouse-manage.component";
import { RowClick } from "@shared/models/row-click.interface";
import { WarehouseResponse } from "../../models/warehouse-response.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-warehouse-list",
  templateUrl: "./warehouse-list.component.html",
  styleUrls: ["./warehouse-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class WarehouseListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _warehouseService: WarehouseService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Almacenes");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
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

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
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

  setGetInputsWarehouses(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Warehouse?Download=True`;
  }

  rowClick(rowClick: RowClick<WarehouseResponse>) {
    let action = rowClick.action;
    let warehouse = rowClick.row;

    switch (action) {
      case "edit":
        this.warehouseEdit(warehouse);
        break;
      case "remove":
        this.warehouseRemove(warehouse);
        break;
    }

    return false;
  }

  openDialogRegister() {
    this._dialog
      .open(WarehouseManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsWarehouses(true);
        }
      });
  }

  warehouseEdit(warehouseData: WarehouseResponse) {
    const dialogConfif = new MatDialogConfig();
    dialogConfif.data = warehouseData;

    this._dialog
      .open(WarehouseManageComponent, {
        disableClose: true,
        width: "400px",
        data: { dialogConfif, mode: "edit" },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsWarehouses(true);
        }
      });
  }

  warehouseRemove(warehouseData: WarehouseResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el almacén ${warehouseData.name}?`,
      text: "Se borrará de forma permanente!",
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
        this._warehouseService
          .warehouseRemove(warehouseData.warehouseId)
          .subscribe(() => this.setGetInputsWarehouses(true));
      }
    });
  }
}
