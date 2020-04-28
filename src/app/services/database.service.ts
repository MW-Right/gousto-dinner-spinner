import { Injectable } from '@angular/core';
import { Recipe, Ingredient, Unit, RecipeIngredients, Types, Quantity} from '../models';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  recipes = new BehaviorSubject([]);
  recipeIngredients = new BehaviorSubject([]);
  units = new BehaviorSubject([]);
  ingredientAmounts = new BehaviorSubject([]);
  ingredients = new BehaviorSubject([]);

  // TODO: try getters
  // get ingredientAmounts() {
  //   return this.ingredientAmounts.asObservable();
  // }

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'recipes.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      });
    });
  }

  getRecipes() {
    return this.database.executeSql('SELECT * FROM recipes', []).then(data => {
      let recipes: Recipe[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          recipes.push(
            data.rows.item(i).map(recipe => ({
              name: recipe.name,
              duration: recipe.duration
            }))
          );
        }
      }

      this.recipes.next(recipes);
    });
  }

  getUnits() {
    return this.database.executeSql('SELECT * FROM units', []).then(data => {
      let units: Unit[] = [];

      if (data.rows.length > 0) {
        data.rows.map(u => {
          units.push({
            id: u.id,
            unit: u.unit
          });
        });
      }
      this.units.next(units);
    });
  }

  getIngredients() {
    return this.database.executeSql('SELECT * FROM ingredients', []).then(data => {
      let ingredients: Ingredient[] = [];

      if (data.rows.length > 0) {
        data.rows.map(i => {
          ingredients.push({
            id: i.id,
            typeId: i.typeId,
            name: i.name
          });
        });
      }
      this.ingredients.next(ingredients);
    });
  }

  getIngredientAmounts() {
    return this.database.executeSql(`
    SELECT * FROM RecipeIngredients ri
    INNER JOIN Recipes r ON r.id = ri.recipeId
    INNER JOIN Ingredients i ON i.id = ri.ingredientId`)
    return this.ingredientAmounts.asObservable();
  }

  getRecipeIngredients() {
    return this.recipeIngredients.asObservable();
  }

  private seedDatabase() {
    this.http.get('../../assets/seed.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.getRecipes();
            this.getUnits();
            this.getIngredientAmounts();
            this.getRecipeIngredients();
            this.dbReady.next(true);
          })
          .catch(e => console.log(e))
      })
  }
}
