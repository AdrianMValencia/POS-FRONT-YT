export interface ProductResponse {
  productId: number;
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: string;
  unitSalePrice: number;
  category: string;
  auditCreateDate: Date;
  state: number;
  stateProduct: string;
  badgeColor: string;
  icView: object;
  icEdit: object;
  icDelete: object;
}

export interface ProductByIdResponse {
  productId: number;
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: string;
  unitSalePrice: number;
  categoryId: number;
  state: number;
}
