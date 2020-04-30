import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Observable<Recipe[]>;
  private recipesCollection: AngularFirestoreCollection<Recipe>;

  constructor(private afs: AngularFirestore) {
    this.recipesCollection = this.afs.collection<Recipe>('recipes');
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes;
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.recipesCollection.doc<Recipe>(id).valueChanges().pipe(
      take(1),
      map(recipe => {
        recipe.id = id;
        return recipe;
      })
    );
  }

  addRecipe(recipe: Recipe): Promise<DocumentReference> {
    return this.recipesCollection.add(recipe);
  }

  updateRecipe(recipe: Recipe): Promise<void> {
    return this.recipesCollection.doc(recipe.id).update({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      duration: recipe.duration
    });
  }

  deleteRecipe(id: string): Promise<void> {
    return this.recipesCollection.doc(id).delete();
  }
}
