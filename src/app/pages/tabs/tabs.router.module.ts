import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pagar',
        children: [
          {
            path: '',
            loadChildren: '../pagar/pagar.module#PagarPageModule'
          }
        ]
      },
      {
        path: 'listar',
        children: [
          {
            path: '',
            loadChildren: '../listar/listar.module#ListarPageModule'
          }
        ]
      },
      {
        path: 'sobre',
        children: [
          {
            path: '',
            loadChildren: '../sobre/sobre.module#SobrePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/pagar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pagar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
