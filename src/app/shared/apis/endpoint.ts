import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
  // CATEGORY MODULE
  LIST_CATEGORIES: "Category",
  LIST_SELECT_CATEGORIES: "Category/Select",
  CATEGORY_BY_ID: "Category/",
  CATEGORY_REGISTER: "Category/Register/",
  CATEGORY_EDIT: "Category/Edit/",
  CATEGORY_REMOVE: "Category/Remove/",

  // AUTH MODULE
  LOGIN: "Auth/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  // PROVIDER MODULE
  LIST_PROVIDERS: "Provider",
  LIST_SELECT_PROVIDERS: "Provider/Select",
  PROVIDER_REGISTER: "Provider/Register/",
  PROVIDER_EDIT: "Provider/Edit/",
  PROVIDER_BY_ID: "Provider/",
  PROVIDER_REMOVE: "Provider/Remove/",

  // DOCUMENT TYPE MODULE
  LIST_DOCUMENT_TYPES: "DocumentType",

  // WAREHOUSE MODULE
  LIST_WAREHOUSES: "Warehouse",
  LIST_SELECT_WAREHOUSES: "Warehouse/Select",
  WAREHOUSE_BY_ID: "Warehouse/",
  WAREHOUSE_REGISTER: "Warehouse/Register/",
  WAREHOUSE_EDIT: "Warehouse/Edit/",
  WAREHOUSE_REMOVE: "Warehouse/Remove/",

  // PRODUCT MODULE
  LIST_PRODUCTS: "Product",
  PRODUCT_BY_ID: "Product/",
  PRODUCT_REGISTER: "Product/Register/",
  PRODUCT_EDIT: "Product/Edit/",
  PRODUCT_REMOVE: "Product/Remove/",
  PRODUCT_STOCK_WAREHOUSE: "Product/ProductStockByWarehouse/",

  // PURCHARSE MODULE
  LIST_PURCHARSES: "Purcharse",
  PURCHARSE_BY_ID: "Purcharse/",
  PURCHARSE_REGISTER: "Purcharse/Register/",
  PURCHARSE_CANCEL: "Purcharse/Cancel/",
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
