import { Component, Inject, OnInit } from '@angular/core';
import { ProductStockWarehouseResponse } from '../../models/product-stock-warehouse-response.interface';
import { IconsService } from '@shared/services/icons.service';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { componentInit } from './product-stock-warehouse-config';

@Component({
  selector: 'vex-product-stock-warehouse',
  templateUrl: './product-stock-warehouse.component.html',
  styleUrls: ['./product-stock-warehouse.component.scss']
})
export class ProductStockWarehouseComponent implements OnInit {
  component;
  productStockByWarehouses: ProductStockWarehouseResponse[];
  codeProduct: string;
  nameProduct: string;
  icClose = IconsService.prototype.getIcon("icClose");

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _productService: ProductService
  ) {
    this.codeProduct = this.data.dialogConfig.data.code;
    this.nameProduct = this.data.dialogConfig.data.name;
   }

  ngOnInit(): void {
    this.component = { ...componentInit }
    this.productStockByWarehouse(this.data.dialogConfig.data.productId);
  }

  productStockByWarehouse(productId: number) {
    this._productService.productStockByWarehouse(productId).subscribe((resp: ProductStockWarehouseResponse[]) => {
      this.productStockByWarehouses = resp
    })
  }
}
