import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Rotas originais(Aplicação exemplo)
  //{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
  /*{ path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },*/
  
  //Minhas rotas
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'modal-pagar', loadChildren: './pages/modal-pagar/modal-pagar.module#ModalPagarPageModule' },
  //{ path: 'pagar', loadChildren: './pages/pagar/pagar.module#PagarPageModule' }
  /*{ path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'pagar', loadChildren: './pages/pagar/pagar.module#PagarPageModule' },
  { path: 'finalizar', loadChildren: './pages/finalizar/finalizar.module#FinalizarPageModule' },
  { path: 'listar', loadChildren: './pages/listar/listar.module#ListarPageModule' },
  { path: 'sobre', loadChildren: './pages/sobre/sobre.module#SobrePageModule' }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
