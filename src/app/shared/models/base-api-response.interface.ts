export interface BaseApiResponse {
  data: any;
  totalRecords: number;
}

export interface BaseResponse {
  isSuccess: boolean;
  data: any;
  message: any;
  errors: any;
}
