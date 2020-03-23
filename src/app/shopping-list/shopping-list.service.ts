import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tommatos', 10)
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    let oldIngredient = null;
    for (const ing of this.ingredients) {
      if (ing.name == ingredient.name) {
        oldIngredient = ing;
        break;
      }
    }
    if(oldIngredient) {
      ingredient.amount += oldIngredient.amount;
      this.updateIngredient(this.ingredients.indexOf(oldIngredient), ingredient)
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      let oldIngredient = null;
      for (const ing of this.ingredients) {
        if (ing.name == ingredient.name) {
          oldIngredient = ing;
          break;
        }
      }
      if(oldIngredient) {
        ingredient.amount += oldIngredient.amount;
        this.updateIngredient(this.ingredients.indexOf(oldIngredient), ingredient)
      } else {
        this.ingredients.push(ingredient);
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
    return this.ingredients.slice();
  }
}