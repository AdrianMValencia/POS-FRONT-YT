export interface RoleRequest {
    description: string;
    state: number;
    permissions: PermissionRequest[];
    menus: MenuRequest[];
}

export interface MenuRequest {
    menuId: number;
}

export interface PermissionRequest {
    permissionId: number;
    permissionName: string;
    permissionDescription: string;
}