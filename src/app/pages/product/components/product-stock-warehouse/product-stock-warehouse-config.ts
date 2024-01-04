import { TableColumnSimple } from "@shared/models/list-table-simple.interface";
import { ProductStockWarehouseResponse } from "../../models/product-stock-warehouse-response.interface";

const tableColumns: TableColumnSimple<ProductStockWarehouseResponse>[] = [
    {
        label: "ALMACÉN",
        cssLabel: ["font-bold", "text-sm", "text-left", "text-am-main-blue-dark bg-am-main-blue-light rounded-l-lg"],
        property: "warehouse",
        cssProperty: ["font-medium", "w-24"],
        type: "text",
        visible: true
    },
    {
        label: "STOCK ACTUAL",
        cssLabel: ["font-bold", "text-sm", "text-center", "text-am-main-blue-dark bg-am-main-blue-light"],
        property: "currentStock",
        cssProperty: ["font-medium", "w-24", "text-center"],
        type: "number",
        visible: true
    },
    {
        label: "PRECIO DE COMPRA",
        cssLabel: ["font-bold", "text-sm", "text-center", "text-am-main-blue-dark bg-am-main-blue-light rounded-r-lg"],
        property: "purchasePrice",
        cssProperty: ["font-medium", "w-24", "text-center"],
        type: "currency",
        visible: true
    },
]

export const componentInit = {
    tableColumns
}