import { dispenseDrink, refillIngredients } from './baristamatic.actions';
import { Drink } from './../baristamatic.component';
import { createAction } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { baristamaticReducer, BaristamaticState, initialState } from './baristamatic.reducer';
describe('Baristamatic Reducer', () => {
  it('should return init state', () => {
    const noopAction = createAction('noop');
    const newState = baristamaticReducer(undefined, noopAction);

    const initState = initialState;
    expect(newState).toEqual(initState);
  });

  it('should reduce total ingredients', () => {
    const drink: Drink = {
      name: 'Coffee',
      ingredients: [
        {
          ingredient: {name: 'coffee', unitCost: 0.75},
          amountNeeded: 3
        },
        {
          ingredient: {name: 'sugar', unitCost: 0.25},
          amountNeeded: 1,
        },
        {
          ingredient: {name: 'cream', unitCost: 0.25},
          amountNeeded: 1,
        }
      ]
    }

    const initState = initialState;
    const dispenseDrinkAction = dispenseDrink({drink});;
    const newState = baristamaticReducer(initState, dispenseDrinkAction);

    expect(newState).not.toEqual(initState);
    expect(newState.coffee).toEqual(7);
  });

  it('should refill ingredients to max', () => {
    const drink: Drink = {
      name: 'Coffee',
      ingredients: [
        {
          ingredient: {name: 'coffee', unitCost: 0.75},
          amountNeeded: 3
        },
        {
          ingredient: {name: 'sugar', unitCost: 0.25},
          amountNeeded: 1,
        },
        {
          ingredient: {name: 'cream', unitCost: 0.25},
          amountNeeded: 1,
        }
      ]
    }

    const initState = initialState;
    const dispenseDrinkAction = dispenseDrink({drink});
    const refillIngredientsAction = refillIngredients();
    const newState = baristamaticReducer(initState, dispenseDrinkAction);

    expect(newState).not.toEqual(initState);
    expect(newState.coffee).toEqual(7);

    const refillState = baristamaticReducer(newState, refillIngredientsAction);

    expect(refillState).toEqual(initState);
  });
});
