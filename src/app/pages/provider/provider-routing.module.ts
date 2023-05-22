import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProviderListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}
