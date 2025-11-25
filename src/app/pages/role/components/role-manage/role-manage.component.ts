import { Component, OnInit } from '@angular/core';
import { IconsService } from '@shared/services/icons.service';
import { statesSelect } from 'src/static-data/configs';
import { PermissionsByRoleResponse, PermissionsResponse } from '../../models/role-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { RoleService } from '../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';
import { RoleRequest } from '../../models/role-request.interface';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class RoleManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon('icClose');
  icRole = IconsService.prototype.getIcon('icRole');
  configs = statesSelect;
  menuPermissions: PermissionsByRoleResponse[];
  indexMenu = 0;
  permissions: PermissionsResponse[];
  private selectedPermissions: PermissionsResponse[] = [];
  selectedPermissionsList: PermissionsResponse[];
  form: FormGroup;
  roleId?: number = 0;

  initForm(): void {
    this.form = this._fb.group({
      roleId: [""],
      description: ["", Validators.required],
      state: ['', Validators.required],
    })
  }

  constructor(
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _roleService: RoleService,
    private _route: Router,
    public _iconService: IconsService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.roleId = params['roleId']
    })
  }

  ngOnInit(): void {
    let indexMenu = 0;

    if (this.roleId > 0) {
      this.roleById(this.roleId);
    }

    this.roleId = this.roleId == undefined ? 0 : this.roleId;

    this._roleService.permissionByRoleId(this.roleId).subscribe((resp) => {
      // resp = resp.filter((menu) => menu.fatherId !== null);
      this.menuPermissions = resp;
      this.setIndexMenu(indexMenu);
    })
  }

  setIndexMenu(indexMenu) {
    this.indexMenu = indexMenu;
    this.permissions = this.menuPermissions[indexMenu].permissions;
  }

  back() {
    this._route.navigate(['/roles']);
  }

  roleById(roleId: number): void {
    this._roleService.roleById(roleId).subscribe((resp) => {
      this.form.patchValue({
        roleId: resp.roleId,
        description: resp.description,
        state: resp.state,
      });
    });
  }

  roleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }

    const roleId = this.roleId;

    if (roleId > 0) {
      this.roleEdit(roleId);
    } else {
      this.roleRegister();
    }
  }


  roleRegister(): void {
    const selectedMenusSet = new Set<number>();

    this.menuPermissions.forEach((menu) => {
      if (menu.permissions.some((perm) => perm.selected)) {
        selectedMenusSet.add(menu.menuId);

        if (menu.fatherId && menu.fatherId !== 0) {
          selectedMenusSet.add(menu.fatherId);
        }
      }
    });

    const selectedMenus = Array.from(selectedMenusSet).map((menuId) => ({
      menuId
    }));

    const role: RoleRequest = {
      description: this.form.value.description,
      state: this.form.value.state,
      permissions: this.selectedPermissionsList.map((perm) => {
        return {
          permissionId: perm.permissionId,
          permissionName: perm.permissionName,
          permissionDescription: perm.permissionDescription
        }
      }),
      menus: selectedMenus
    }

    this._roleService.roleRegister(role).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message);
        this._route.navigate(['/roles']);
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

  roleEdit(roleId: number): void {
    const allPermissions = this.menuPermissions
      .reduce((accumulator, menu) => accumulator.concat(menu.permissions), [])
      .map((permission: PermissionsResponse) => ({
        permissionId: permission.permissionId,
        permissionName: permission.permissionName,
        permissionDescription: permission.permissionDescription,
        selected: permission.selected
      }))

    const selectedMenusSet = new Set<number>();

    this.menuPermissions.forEach((menu) => {
      if (menu.permissions.some((perm) => perm.selected)) {
        selectedMenusSet.add(menu.menuId);

        if (menu.fatherId) {
          selectedMenusSet.add(menu.fatherId);
        }
      }
    });

    const selectedMenus = Array.from(selectedMenusSet).map((menuId) => ({
      menuId
    }));

    const role: RoleRequest = {
      description: this.form.value.description,
      state: this.form.value.state,
      permissions: allPermissions,
      menus: selectedMenus
    }

    this._roleService.roleEdit(roleId, role).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message);
        this._route.navigate(['/roles']);
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

  optionChecked(selectedPermissions: PermissionsResponse) {
    selectedPermissions.selected = !selectedPermissions.selected;
    this.togglePermissionsSelection(selectedPermissions);
    this.selectedPermissionsList = this.getSelectedPermissions();
  }

  getSelectedPermissions(): PermissionsResponse[] {
    return this.selectedPermissions;
  }

  togglePermissionsSelection(permission: PermissionsResponse) {
    const index = this.selectedPermissions
      .findIndex((p) => p.permissionName === permission.permissionName);

    if (index !== -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permission);
    }
  }
}
