import { dispenseDrink, refillIngredients } from './baristamatic.actions';
import { createReducer, on } from "@ngrx/store"

export interface BaristamaticState {
  coffee: number,
  decafCoffee: number,
  sugar: number,
  cream: number,
  steamedMilk: number,
  foamedMilk: number,
  espresso: number,
  cocoa: number,
  whippedCream: number,
}

export const initialState: BaristamaticState = {
  coffee: 10,
  decafCoffee: 10,
  sugar: 10,
  cream: 10,
  steamedMilk: 10,
  foamedMilk: 10,
  espresso: 10,
  cocoa: 10,
  whippedCream: 10
}

export type StateKey = keyof typeof initialState;

export const baristamaticReducer = createReducer(
  initialState,
  on(dispenseDrink, (state, {drink}) => {
    let newState: BaristamaticState = {...state};
    console.log(drink, newState);
    drink.ingredients.map((i) => {
      newState[i.ingredient.name as StateKey] = newState[i.ingredient.name as StateKey] - i.amountNeeded;
    });

    return {...newState};
  }),
  on(refillIngredients, (state) => {
    return {...initialState}
  })
)
