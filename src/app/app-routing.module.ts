import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  { 
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes/recipes.module').then(m => m.RecipesPageModule) 
  },
  { 
    path: 'recipes/:id',
    loadChildren: () => import('./recipes/recipe/recipe.module').then(m => m.RecipePageModule) 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
