import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path:'create',loadChildren:'./create/create.module#CreateModule',
  },
  {
    path:'list',loadChildren:'./list/list.module#ListModule'
  },
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules});