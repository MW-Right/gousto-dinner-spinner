export class Recipe {
    id: number;
    name: string;
    duration: number;
    recipeIngredients: RecipeIngredients[];
}

export class Ingredient {
    id: number;
    name: string;
    typeId: number;
}

export class Quantity {
    id: number;
    amount: number;
}

export class RecipeIngredients {
    id: number;
    recipeId: number;
    measurementId: number;
    quantityId: number;
    ingredientId: number; 
}

export class Unit {
    id: number;
    unit: string;
}

export enum Types {
    "Meat",
    "Fruit and Veg",
    "Spice",
    "Herbs",
    "Sauce",
    "Meat-Free",
    "Grains",
    "Pasta"
}


