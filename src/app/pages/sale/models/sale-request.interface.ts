export class SaleRequest {
  voucherNumber: string;
  observation?: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  voucherDocumentTypeId: number;
  warehouseId: number;
  clientId: number;
  saleDetails: SaleDetailRequestDto[];
}

export class SaleDetailRequestDto {
  productId: number;
  quantity: number;
  unitSalePrice: number;
  total: number;
}
