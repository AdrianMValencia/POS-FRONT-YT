import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { IconsService } from "@shared/services/icons.service";
import { ProviderSelectService } from "@shared/services/provider-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { componentSettings } from "../purcharse-list/purcharse-list-config";
import { FiltersBox } from "@shared/models/search-options.interface";
import { PurcharseDetailService } from "../../services/purcharse-detail.service";
import { RowClick } from "@shared/models/row-click.interface";
import { ProductDetailsResponse } from "../../models/purcharse-response.interface";

@Component({
  selector: "vex-purcharse-create",
  templateUrl: "./purcharse-create.component.html",
  styleUrls: ["./purcharse-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class PurcharseCreateComponent implements OnInit {
  componentPurcharseDetail;

  providerSelect: SelectAutoComplete[];
  warehouseSelect: SelectAutoComplete[];
  form: FormGroup;
  numRecordsProducts: number = 3;

  icPurcharse = IconsService.prototype.getIcon("icSales");
  icRemove = IconsService.prototype.getIcon("icDelete");

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  igv: number = 0;
  total: number = 0;

  initForm(): void {
    this.form = this._fb.group({
      providerId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(
    private _fb: FormBuilder,
    private _providerSelectService: ProviderSelectService,
    private _warehouseSelectService: WarehouseSelectService,
    public _purcharseDetailService: PurcharseDetailService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectProviders();
    this.listSelectWarehouses();
    this.componentPurcharseDetail = componentSettings;
  }

  listSelectProviders(): void {
    this._providerSelectService
      .listSelectProviders()
      .subscribe((resp) => (this.providerSelect = resp));
  }

  listSelectWarehouses(): void {
    this._warehouseSelectService
      .listSelectWarehouses()
      .subscribe((resp) => (this.warehouseSelect = resp));
  }

  search(data: FiltersBox) {
    this.componentPurcharseDetail.filters.numFilter = data.searchValue;
    this.componentPurcharseDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.componentPurcharseDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentPurcharseDetail.filters.numFilter}&textFilter=${this.componentPurcharseDetail.filters.textFilter}`;
    }

    this.componentPurcharseDetail.getInputs = str;
  }

  rowClick(rowClick: RowClick<ProductDetailsResponse>) {
    let action = rowClick.action;
    let products = rowClick.row;

    switch (action) {
      case "addDetail":
        this.addDetail(products);
        break;
    }

    return false;
  }

  addDetail(products: ProductDetailsResponse) {
    if (products.totalAmount <= 0) {
      return;
    }

    const productCopy = { ...products };

    const existingProduct = this.cartDetails.find(
      (item) => item.code === productCopy.code
    );

    if (existingProduct) {
      existingProduct.quantity += productCopy.quantity;
      existingProduct.totalAmount =
        existingProduct.quantity * existingProduct.unitPurcharsePrice;
    } else {
      this.cartDetails.push(productCopy);
    }

    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();
  }

  calculateSubtotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.unitPurcharsePrice,
      0
    );
  }

  calculateIGV() {
    this.igv = this.subtotal * 0.18;
  }

  calculateTotal() {
    this.total = this.subtotal + this.igv;
  }

  removeFromCart(product: ProductDetailsResponse) {
    const index = this.cartDetails.indexOf(product);

    if (index !== -1) {
      this.cartDetails.splice(index, 1);
    }

    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();
  }
}
