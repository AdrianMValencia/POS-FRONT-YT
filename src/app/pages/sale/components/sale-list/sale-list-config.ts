import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { GenericValidators } from "@shared/validators/generic-validators";
import { SaleResponse } from "../../models/sale-response.interface";
import { IconsService } from "@shared/services/icons.service";

const searchOptions: SearchOptions[] = [
  {
    label: "Comprobante",
    value: 1,
    placeholder: "Buscar por comprobante",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
    icon: "icName",
  },
];

const tableColumns: TableColumns<SaleResponse>[] = [
  {
    label: "COMPROBANTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "voucherDescription",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: true,
    sort: true,
    sortProperty: "voucherDescription",
    visible: true,
    download: true,
  },
  {
    label: "N° COMPROBANTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "voucherNumber",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "voucherNumber",
    visible: true,
    download: true,
  },
  {
    label: "CLIENTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "client",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "client",
    visible: true,
    download: true,
  },
  {
    label: "ALMACÉN",
    cssLabel: ["font-bold", "text-sm"],
    property: "warehouse",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "warehouse",
    visible: true,
    download: true,
  },
  {
    label: "MONTO TOTAL",
    cssLabel: ["font-bold", "text-sm"],
    property: "totalAmount",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "currency",
    sticky: true,
    sort: true,
    sortProperty: "totalAmount",
    visible: true,
    download: true,
  },
  {
    label: "F. DE VENTA",
    cssLabel: ["font-bold", "text-sm"],
    property: "dateOfSale",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: true,
    sort: true,
    sortProperty: "dateOfSale",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icView",
    cssProperty: [],
    type: "icon",
    action: "viewDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icInvoice",
    cssProperty: [],
    type: "icon",
    action: "exportInvoice",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icCancel",
    cssProperty: [],
    type: "icon",
    action: "cancel",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  icSale: IconsService.prototype.getIcon("icSales"),
  tableColumns,
  searchOptions,
  initialSort: "Id",
  initialSortDir: "desc",
  filters,
  resetFilters,
  getInputs,
  filename: "listado-de-ventas",
};