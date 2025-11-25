import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleManageComponent } from './components/role-manage/role-manage.component';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  },
  {
    path: 'crear',
    component: RoleManageComponent
  },
  {
    path: 'editar/:roleId',
    component: RoleManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
