export interface SearchOptions {
  label: string;
  value: number;
  placeholder: string;
  validation: any;
  validation_desc: string;
  icon: string;
  min_length?: number;
}

export interface FiltersBox {
  searchValue: number;
  searchData: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
