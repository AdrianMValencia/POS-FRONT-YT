export interface PurcharseResponse {
  purcharseId: number;
  provider: string;
  warehouse: string;
  totalAmount: number;
  dateOfPurcharse: Date;
  icVisibility: object;
  icCancel: object;
}
