export interface ClientResponse {
  clientId: number;
  name: string;
  email: string;
  documentType: string;
  documentNumber: string;
  address: string;
  phone: string;
  auditCreateDate: Date;
  state: number;
  stateClient: string;
  badgeColor: string;
  icEdit: object;
  icDelete: object;
}

export interface ClientById {
  clientId: number;
  name: string;
  email: string;
  documentTypeId: number;
  documentNumber: string;
  address: string;
  phone: string;
  state: number;
}
