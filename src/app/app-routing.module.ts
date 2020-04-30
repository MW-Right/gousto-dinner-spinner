import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes-list/recipes-list.module').then( m => m.RecipesListPageModule)
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipes/recipe-details/recipe-details.module').then(m => m.RecipeDetailsPageModule)
  },
  {
    path: 'recipe/:id',
    loadChildren: () => import('./recipes/recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
