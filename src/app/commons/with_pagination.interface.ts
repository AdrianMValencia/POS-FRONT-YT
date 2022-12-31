export interface WithPaginationInterface<T> {
    totalRecords : number;
    complete_results : boolean;
    success : 1 | 0;
    items : T[];
    message : string;
  }