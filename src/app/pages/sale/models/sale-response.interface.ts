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