import { Component, OnInit } from "@angular/core";
import { componentSettings } from "../sale-list/sale-list-config";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { VoucherDocumentTypeSelectService } from "@shared/services/voucher-document-type-select.service";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { ClientSelectService } from "@shared/services/client-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { FiltersBox } from "@shared/models/search-options.interface";
import { SaleDetailService } from "../../services/sale-detail.service";

@Component({
  selector: "vex-sale-create",
  templateUrl: "./sale-create.component.html",
  styleUrls: ["./sale-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class SaleCreateComponent implements OnInit {
  componentSaleDetail;
  viewDetailRead: boolean = false;
  form: FormGroup;
  numRecordsProducts: number = 3;

  voucherDocumentTypeSelect: SelectAutoComplete[];
  clientSelect: SelectAutoComplete[];
  warehouseSelect: SelectAutoComplete[];
  selectedWarehouseId: number;

  initForm(): void {
    this.form = this._fb.group({
      voucherDocumentTypeId: ["", Validators.required],
      voucherNumber: ["", Validators.required],
      clientId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(private _route: Router, 
      private _fb: FormBuilder,
      private _voucherDocumentTypeSelectService: VoucherDocumentTypeSelectService,
      private _clientSelectService: ClientSelectService,
      private _warehouseSelectService: WarehouseSelectService,
      public _saleDetailService: SaleDetailService) {
    this.componentSaleDetail = componentSettings;
  }

  ngOnInit(): void {
    this.initForm();
    this.listSelectVoucherDocumentTypes();
    this.listSelectClients();
    this.listSelectWarehouses();
  }

  back() {
    this._route.navigate(["proceso-ventas"]);
  }

  listSelectVoucherDocumentTypes(): void {
    this._voucherDocumentTypeSelectService
    .listSelectVoucherDocumentType()
    .subscribe((resp) => {
      this.voucherDocumentTypeSelect = resp;
    })
  }

  listSelectClients(): void {
    this._clientSelectService
    .listSelectClients()
    .subscribe((resp) => {
      this.clientSelect = resp;
    })
  }

  listSelectWarehouses(): void {
    this._warehouseSelectService
    .listSelectWarehouses()
    .subscribe((resp) => {
      this.warehouseSelect = resp;
    })
  }

  search(data: FiltersBox) {
    this.componentSaleDetail.filters.numFilter = data.searchValue;
    this.componentSaleDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.componentSaleDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentSaleDetail.filters.numFilter}&textFilter=${this.componentSaleDetail.filters.textFilter}`;
    }

    str += `&Id=${this.selectedWarehouseId}`;

    this.componentSaleDetail.getInputs = str;
  }

  onItemSelected(id: number): void {
    this.selectedWarehouseId = id;
    this.formatGetInputs();
  }
}
