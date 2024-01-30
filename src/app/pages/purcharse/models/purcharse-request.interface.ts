export interface PurcharseRequest {
  observation: string;
  subtotal: number;
  igv: number;
  totalAmount: number;
  warehouseId: number;
  providerId: number;
  purcharseDetails: PurcharseDetailRequest[];
}

export interface PurcharseDetailRequest {
  productId: number;
  quantity: number;
  unitPurcharsePrice: number;
  total: number;
}
