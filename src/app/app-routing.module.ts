import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "@shared/guards/auth.guard";

const childrenRoutes: VexRoutes = [
  {
    path: "estadisticas",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "categorias",
    loadChildren: () =>
      import("./pages/category/category.module").then((m) => m.CategoryModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "proveedores",
    loadChildren: () =>
      import("./pages/provider/provider.module").then((m) => m.ProviderModule),
  },
  {
    path: "almacenes",
    loadChildren: () =>
      import("./pages/warehouse/warehouse.module").then(
        (m) => m.WarehouseModule
      ),
  },
  {
    path: "productos",
    loadChildren: () =>
      import("./pages/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "proceso-compras",
    loadChildren: () =>
      import("./pages/purcharse/purcharse.module").then(
        (m) => m.PurcharseModule
      ),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "estadisticas",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
