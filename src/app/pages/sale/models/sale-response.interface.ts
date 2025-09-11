export interface SaleResponse {
  saleId: number;
  voucherDescription: string;
  voucherNumber: string;
  client: string;
  warehouse: string;
  totalAmount: number;
  dateOfSale: Date;
  badgeColor: string;
  icView: object;
  icInvoice: object;
  icCancel: object;
}

export interface ProductDetailsResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  category: string;
  quantity: number;
  unitSalePrice: number;
  currentStock: number;
  totalAmount: number;
  icAdd: object;
}

export interface SaleByIdResponse {
  saleId: number;
  voucherNumber: string;
  observation?: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  voucherDocumentTypeId: number;
  warehouseId: number;
  clientId: number;
  dateOfSale: Date;
  saleDetails: SaleDetailByIdResponse[];
}

export interface SaleDetailByIdResponse {
  productId: number;
  image?: string;
  code: string;
  name: string;
  quantity: number;
  unitSalePrice: number;
  totalAmount: number;
}
