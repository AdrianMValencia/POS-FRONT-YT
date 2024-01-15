import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { GenericValidators } from "@shared/validators/generic-validators";
import { PurcharseResponse } from "../../models/purcharse-response.interface";
import { IconsService } from "@shared/services/icons.service";

const searchOptions: SearchOptions[] = [
  {
    label: "Proveedor",
    value: 1,
    placeholder: "Buscar por Proveedor",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
    icon: "icName",
  },
];

const tableColumns: TableColumns<PurcharseResponse>[] = [
  {
    label: "PROVEEDOR",
    cssLabel: ["font-bold", "text-sm"],
    property: "provider",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "provider",
    visible: true,
    download: true,
  },
  {
    label: "ALMACÉN",
    cssLabel: ["font-bold", "text-sm"],
    property: "warehouse",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
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
    label: "F. DE COMPRA",
    cssLabel: ["font-bold", "text-sm"],
    property: "dateOfPurcharse",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: true,
    sort: true,
    sortProperty: "dateOfPurcharse",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icVisibility",
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
  icPurcharse: IconsService.prototype.getIcon("icSales"),
  searchOptions,
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  filters,
  resetFilters,
  getInputs,
  filename: "listado-de-compras",
};
