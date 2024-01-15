import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { IconsService } from "@shared/services/icons.service";
import { ProviderSelectService } from "@shared/services/provider-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";

@Component({
  selector: "vex-purcharse-create",
  templateUrl: "./purcharse-create.component.html",
  styleUrls: ["./purcharse-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class PurcharseCreateComponent implements OnInit {
  providerSelect: SelectAutoComplete[];
  warehouseSelect: SelectAutoComplete[];
  form: FormGroup;

  icPurcharse = IconsService.prototype.getIcon("icSales");

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
    private _warehouseSelectService: WarehouseSelectService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectProviders();
    this.listSelectWarehouses();
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
}
