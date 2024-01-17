export interface TableColumns<T> {
  label: string;
  cssLabel: string[];
  property: keyof T | string;
  cssProperty: string[];
  subProperty?: keyof T | string;
  cssSubProperty?: string[];
  type:
    | "text"
    | "date"
    | "datetime"
    | "time"
    | "icon"
    | "button"
    | "badge"
    | "image"
    | "currency"
    | "textUppercase"
    | "number"
    | "quantityPurcharse"
    | "unitPurcharsePrice"
    | "totalAmount";
  visible: boolean;
  sort: boolean;
  sortProperty?: string;
  action?: string;
  sticky: boolean;
  tooltip?: string;
  download?: boolean;
  property_download?: string;
}

export interface TableFooter<T> {
  label: string;
  property: keyof T | string;
  tooltip: string;
}
