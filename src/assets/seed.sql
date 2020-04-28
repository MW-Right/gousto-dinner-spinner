/* Convention
- Tables: PascalCase and plural
    - primary keys: 'id'
    - foreign keys: {table}Id
- Columns: camelCase, singular
*/

CREATE TABLE IF NOT EXISTS Recipes(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, duration INTEGER NOT NULL);
INSERT or IGNORE INTO recipe VALUES (1, 'Fiery Chicken, Limey Rice & Mango Salsa', 25);
INSERT or IGNORE INTO recipe VALUES (2, 'Creamy Chicken Korma & Chips', 35);
INSERT or IGNORE INTO recipe VALUES (3, 'Tandoori Fish, Mint Raita & Kachumber Salad', 20);

CREATE TABLE IF NOT EXISTS Ingredients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    typeId INTEGER NOT NULL,
    FOREIGN KEY (typeId)
        REFERENCES Types(id));


CREATE TABLE IF NOT EXISTS Types(id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL)
INSERT or IGNORE INTO Types VALUES (1, 'Meat');
INSERT or IGNORE INTO Types VALUES (2, 'Fruit and Veg');
INSERT or IGNORE INTO Types VALUES (3, 'Spice');
INSERT or IGNORE INTO Types VALUES (4, 'Herbs');
INSERT or IGNORE INTO Types VALUES (5, 'Sauce');
INSERT or IGNORE INTO Types VALUES (6, 'Meat-Free');
INSERT or IGNORE INTO Types VALUES (7, 'Grains');
INSERT or IGNORE INTO Types VALUES (8, 'Pasta');

CREATE TABLE IF NOT EXISTS Measurements(id INTEGER PRIMARY KEY AUTOINCREMENT, unit TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS Quantities(id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL)

CREATE TABLE IF NOT EXISTS RecipeIngredients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipeId INTEGER NOT NULL,
    ingredientId INTEGER NOT NULL,
    measurementsId INTEGER NOT NULL,
    quantityId INTEGER NOT NULL,
    FOREIGN KEY (unitId)
        REFERENCES Units(id),
    FOREIGN KEY (recipeId)
        REFERENCES Recipes(id),
    FOREIGN KEY (ingredientId)
        REFERENCES Ingredients(id)
    FOREIGN KEY (quantityId)
        REFERENCES Quantities(id));