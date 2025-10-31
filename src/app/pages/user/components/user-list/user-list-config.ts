import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { UserResponse } from "../../models/user-response.interface";

const searchOptions: SearchOptions[] = [
    {
        label: "Usuario",
        value: 1,
        placeholder: "Buscar por Usuario",
        validation: [GenericValidators.alphanumeric],
        validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
        icon: "icName",
    },
    {
        label: "Email",
        value: 2,
        placeholder: "Buscar por Email",
        validation: [GenericValidators.emailValidation],
        validation_desc: "Sólo se permite letras en esta búsqueda.",
        icon: "icName",
    },
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

const tableColumns: TableColumns<UserResponse>[] = [
    {
        label: "",
        cssLabel: ["font-bold", "text-sm"],
        property: "image",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "image",
        sticky: true,
        sort: true,
        sortProperty: "image",
        visible: true,
        download: true,
    },
    {
        label: "USUARIO",
        cssLabel: ["font-bold", "text-sm"],
        property: "userName",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "textUppercase",
        sticky: true,
        sort: true,
        sortProperty: "userName",
        visible: true,
        download: true,
    },
    {
        label: "EMAIL",
        cssLabel: ["font-bold", "text-sm"],
        property: "email",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "email",
        visible: true,
        download: true,
    },
    {
        label: "TIPO AUTH",
        cssLabel: ["font-bold", "text-sm"],
        property: "authType",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "authType",
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
        property: "stateUser",
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
    icUser: IconsService.prototype.getIcon("icUser"),
    searchOptions,
    menuItems,
    tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    filters,
    resetFilters,
    getInputs,
    filename: "listado-de-usuarios",
};