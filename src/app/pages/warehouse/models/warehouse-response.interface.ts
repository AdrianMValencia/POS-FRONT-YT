export interface WarehouseResponse {
  warehouseId: number;
  name: string;
  auditCreateDate: Date;
  state: number;
  stateWarehouse: string;
  badgeColor: string;
  icEdit: object;
  icDelete: object;
}

export interface WarehouseByIdResponse {
  warehouseId: number;
  name: string;
  state: number;
}
