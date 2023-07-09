import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ProviderService } from "../../services/provider.service";
import { componentSettings } from "./provider-list-config";
import { FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ProviderManageComponent } from "../provider-manage/provider-manage.component";
import { ProviderResponse } from "../../models/provider-response.interface";
import { RowClick } from "@shared/models/row-click.interface";

@Component({
  selector: "vex-provider-list",
  templateUrl: "./provider-list.component.html",
  styleUrls: ["./provider-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ProviderListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _providerService: ProviderService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Proveedores");
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

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(ProviderManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsProviders(true);
        }
      });
  }

  rowClick(rowClick: RowClick<ProviderResponse>) {
    let action = rowClick.action;
    let provider = rowClick.row;

    switch (action) {
      case "edit":
        this.providerEdit(provider);
        break;
      case "remove":
        this.providerRemove(provider);
        break;
    }

    return false;
  }

  providerEdit(providerData: ProviderResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = providerData;

    this._dialog
      .open(ProviderManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsProviders(true);
        }
      });
  }

  providerRemove(provider: ProviderResponse) {}

  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
