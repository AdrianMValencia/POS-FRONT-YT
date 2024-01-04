export interface ProductRequest {
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: File;
  unitSalePrice: number;
  categoryId: number;
  state: number;
}
