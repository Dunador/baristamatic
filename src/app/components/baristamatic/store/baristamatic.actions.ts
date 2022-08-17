import { Drink } from './../baristamatic.component';
import { createAction, props } from "@ngrx/store";

export const dispenseDrink = createAction('[Baristamatic]: Dispense Drink', props<{drink: Drink}>());
export const refillIngredients = createAction('[Baristamatic] Refill Ingredients');