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

export interface PurcharseByIdResponse {
  purcharseId: number;
  observation: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  providerId: number;
  warehouseId: number;
  purcharseDetails: PurcharseDetailByIdResponse[];
}

export interface PurcharseDetailByIdResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  quantity: number;
  unitPurcharsePrice: number;
  totalAmount: number;
}
