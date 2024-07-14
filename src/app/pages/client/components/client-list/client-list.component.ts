import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ClientService } from "../../services/client.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { componentSettings } from "./client-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { ClientManageComponent } from "../client-manage/client-manage.component";
import { RowClick } from "@shared/models/row-click.interface";
import { ClientResponse } from "../../models/client-response-interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ClientListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _clientService: ClientService,
    private _dialog: MatDialog
  ) {
    customTitle.set("Clientes");
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

  setGetInputsClients(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Client?Download=True`;
  }

  openDialogRegister() {
    this._dialog
      .open(ClientManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsClients(true);
        }
      });
  }

  rowClick(rowClick: RowClick<ClientResponse>) {
    let action = rowClick.action;
    let client = rowClick.row;

    switch (action) {
      case "edit":
        this.clientEdit(client);
        break;
      case "remove":
        this.clientRemove(client);
        break;
    }
  }

  clientEdit(clientData: ClientResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = clientData;

    this._dialog
      .open(ClientManageComponent, {
        data: { dialogConfig, mode: "edit" },
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsClients(true);
        }
      });
  }

  clientRemove(clientData: ClientResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el cliente ${clientData.name}?`,
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
        this._clientService
          .clientRemove(clientData.clientId)
          .subscribe(() => this.setGetInputsClients(true));
      }
    });
  }
}
