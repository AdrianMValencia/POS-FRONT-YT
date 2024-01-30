import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PurcharseListComponent } from "./components/purcharse-list/purcharse-list.component";
import { PurcharseCreateComponent } from "./components/purcharse-create/purcharse-create.component";

const routes: Routes = [
  {
    path: "",
    component: PurcharseListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
  {
    path: "crear",
    component: PurcharseCreateComponent,
  },
  {
    path: "crear/:purcharseId",
    component: PurcharseCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurcharseRoutingModule {}
