export interface PurcharseResponse {
  purcharseId: number;
  provider: string;
  warehouse: string;
  totalAmount: number;
  dateOfPurcharse: Date;
  icVisibility: object;
  icCancel: object;
}

export interface ProductDetailsResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  category: string;
  quantity: number;
  unitPurcharsePrice: number;
  totalAmount: number;
  icAdd: object;
}
