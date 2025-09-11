import { Component, OnInit } from "@angular/core";
import { componentSettings } from "../sale-list/sale-list-config";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { VoucherDocumentTypeSelectService } from "@shared/services/voucher-document-type-select.service";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { ClientSelectService } from "@shared/services/client-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { FiltersBox } from "@shared/models/search-options.interface";
import { SaleDetailService } from "../../services/sale-detail.service";
import { RowClick } from "@shared/models/row-click.interface";
import { ProductDetailsResponse } from "../../models/sale-response.interface";
import { IconsService } from "@shared/services/icons.service";
import { AlertService } from "@shared/services/alert.service";
import { SaleRequest } from "../../models/sale-request.interface";
import { SaleService } from "../../services/sale.service";

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

  icRemove = IconsService.prototype.getIcon("icDelete");

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  igv: number = 0;
  total: number = 0;

  saleId: number = 0;

  initForm(): void {
    this.form = this._fb.group({
      voucherDocumentTypeId: ["", Validators.required],
      voucherNumber: ["", Validators.required],
      clientId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(
    private _route: Router,
    private _fb: FormBuilder,
    private _voucherDocumentTypeSelectService: VoucherDocumentTypeSelectService,
    private _clientSelectService: ClientSelectService,
    private _warehouseSelectService: WarehouseSelectService,
    public _saleDetailService: SaleDetailService,
    private _alert: AlertService,
    private _saleService: SaleService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.componentSaleDetail = componentSettings;

    this._activatedRoute.params.subscribe((params) => {
      this.saleId = params["saleId"];
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.listSelectVoucherDocumentTypes();
    this.listSelectClients();
    this.listSelectWarehouses();

    if (this.saleId > 0) {
      this.saleById(this.saleId);
      this.viewDetailRead = true;
    }
  }

  saleById(saleId: number) {
    this._saleService.saleById(saleId).subscribe((resp) => {
      this.form.patchValue({
        voucherDocumentTypeId: resp.voucherDocumentTypeId,
        voucherNumber: resp.voucherNumber,
        clientId: resp.clientId,
        warehouseId: resp.warehouseId,
        observation: resp.observation,
      });

      (this.cartDetails = resp.saleDetails),
        (this.subtotal = resp.subTotal),
        (this.igv = resp.igv),
        (this.total = resp.totalAmount);
    });
  }

  back() {
    this._route.navigate(["proceso-ventas"]);
  }

  listSelectVoucherDocumentTypes(): void {
    this._voucherDocumentTypeSelectService
      .listSelectVoucherDocumentType()
      .subscribe((resp) => {
        this.voucherDocumentTypeSelect = resp;
      });
  }

  listSelectClients(): void {
    this._clientSelectService.listSelectClients().subscribe((resp) => {
      this.clientSelect = resp;
    });
  }

  listSelectWarehouses(): void {
    this._warehouseSelectService.listSelectWarehouses().subscribe((resp) => {
      this.warehouseSelect = resp;
    });
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

  addDetail = (products: ProductDetailsResponse) => {
    if (products.totalAmount <= 0) {
      return;
    }

    const productCopy = { ...products };

    const existingProduct = this.cartDetails.find(
      (item) => item.code === productCopy.code
    );

    const validateResult = existingProduct
      ? this.validateStock(existingProduct, productCopy.quantity)
      : this.validateStock(productCopy, null);

    if (validateResult) {
      this._alert.warn(
        "Stock agotado",
        "La cantidad seleccionada supera el stock disponible"
      );

      return;
    }

    if (existingProduct) {
      existingProduct.quantity += productCopy.quantity;
      existingProduct.totalAmount =
        existingProduct.quantity * existingProduct.unitSalePrice;
    } else {
      this.cartDetails.push(productCopy);
    }

    this.calculateSubtotal();
    this.calculateIgv();
    this.calculateTotal();
  };

  validateStock(
    existingProduct: ProductDetailsResponse,
    quantityToAdd: number
  ): boolean {
    if (
      existingProduct.quantity + quantityToAdd >
      existingProduct.currentStock
    ) {
      return true;
    }

    return false;
  }

  calculateSubtotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.unitSalePrice,
      0
    );
  }

  calculateIgv() {
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
    this.calculateIgv();
    this.calculateTotal();
  }

  saleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const sale: SaleRequest = {
      voucherNumber: this.form.value.voucherNumber,
      observation: this.form.value.observation,
      voucherDocumentTypeId: this.form.value.voucherDocumentTypeId,
      warehouseId: this.form.value.warehouseId,
      clientId: this.form.value.clientId,
      subTotal: this.subtotal,
      igv: this.igv,
      totalAmount: this.total,
      saleDetails: this.cartDetails.map((product: ProductDetailsResponse) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
          unitSalePrice: product.unitSalePrice,
          total: product.totalAmount,
        };
      }),
    };

    this._saleService.saleRegister(sale).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._route.navigate(["proceso-ventas"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }
}
