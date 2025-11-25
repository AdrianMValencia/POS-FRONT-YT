import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { RoleResponse } from "../../models/role-response.interface";

const searchOptions: SearchOptions[] = [
    {
        label: "Descripción",
        value: 1,
        placeholder: "Buscar por Descripción",
        validation: [GenericValidators.alphanumeric],
        validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
        icon: "icName",
    }
];

const menuItems: MenuItems[] = [
    {
        type: "link",
        id: "all",
        icon: IconsService.prototype.getIcon("icViewHeadline"),
        label: "Todos",
    },
    {
        type: "link",
        id: "Activo",
        value: 1,
        icon: IconsService.prototype.getIcon("icLabel"),
        label: "Activo",
        class: {
            icon: "text-green",
        },
    },
    {
        type: "link",
        id: "Inactivo",
        value: 0,
        icon: IconsService.prototype.getIcon("icLabel"),
        label: "Inactivo",
        class: {
            icon: "text-gray",
        },
    },
];

const tableColumns: TableColumns<RoleResponse>[] = [
    {
        label: "ROL",
        cssLabel: ["font-bold", "text-sm"],
        property: "description",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "description",
        visible: true,
        download: true,
    },
    {
        label: "F. DE CREACIÓN",
        cssLabel: ["font-bold", "text-sm"],
        property: "auditCreateDate",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "datetime",
        sticky: false,
        sort: true,
        visible: true,
        download: true,
    },
    {
        label: "ESTADO",
        cssLabel: ["font-bold", "text-sm"],
        property: "stateRole",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "badge",
        sticky: false,
        sort: false,
        visible: true,
        download: true,
    },
    {
        label: "",
        cssLabel: [],
        property: "icEdit",
        cssProperty: [],
        type: "icon",
        action: "edit",
        sticky: false,
        sort: false,
        visible: true,
        download: false,
    },
    {
        label: "",
        cssLabel: [],
        property: "icDelete",
        cssProperty: [],
        type: "icon",
        action: "remove",
        sticky: false,
        sort: false,
        visible: true,
        download: false,
    },
];

const filters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: "",
    endDate: "",
    refresh: false,
};

const resetFilters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: "",
    endDate: "",
    refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
    icRole: IconsService.prototype.getIcon("icRole"),
    searchOptions,
    menuItems,
    tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    filters,
    resetFilters,
    getInputs,
    filename: "listado-de-roles",
};