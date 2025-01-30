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