import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BaristamaticState, StateKey } from './store/baristamatic.reducer';
import * as BaristaActions from './store/baristamatic.actions';

export interface Drink {
  name: string,
  ingredients: DrinkIngredient[],
}

export interface DrinkIngredient {
  ingredient: Ingredient,
  amountNeeded: number,
}

export interface Ingredient {
  name: string,
  unitCost: number,
}

@Component({
  selector: 'app-baristamatic',
  templateUrl: './baristamatic.component.html',
  styleUrls: ['./baristamatic.component.css']
})
export class BaristamaticComponent implements OnInit, OnDestroy {

  // Set up Ingredients for use with Drinks.

  coffee: Ingredient = {name: 'coffee', unitCost: 0.75};
  decafCoffee: Ingredient = {name: 'decafCoffee', unitCost: 0.75};
  sugar: Ingredient = {name: 'sugar', unitCost: 0.25};
  cream: Ingredient = {name: 'cream', unitCost: 0.25};
  steamedMilk: Ingredient = {name: 'steamedMilk', unitCost: 0.35};
  foamedMilk: Ingredient = {name: 'foamedMilk', unitCost: 0.35};
  espresso: Ingredient = {name: 'espresso', unitCost: 1.10};
  cocoa: Ingredient = {name: 'cocoa', unitCost: 0.90};
  whippedCream: Ingredient = {name: 'whippedCream', unitCost: 1.00};

  // Create our drink options array.

  drinkOptions: Drink[] = [
    {
      name: 'Coffee',
      ingredients: [
        {
          ingredient: this.coffee,
          amountNeeded: 3
        },
        {
          ingredient: this.sugar,
          amountNeeded: 1,
        },
        {
          ingredient: this.cream,
          amountNeeded: 1,
        }
      ]
    },
    {
      name: 'Decaf Coffee',
      ingredients: [
        {
          ingredient: this.decafCoffee,
          amountNeeded: 3
        },
        {
          ingredient: this.sugar,
          amountNeeded: 1
        },
        {
          ingredient: this.cream,
          amountNeeded: 1
        }
      ]
    },
    {
      name: 'Caffe Latte',
      ingredients: [
        {
          ingredient: this.espresso,
          amountNeeded: 2
        },
        {
          ingredient: this.steamedMilk,
          amountNeeded: 1
        }
      ]
    },
    {
      name: 'Caffe Americano',
      ingredients: [
        {
          ingredient: this.espresso,
          amountNeeded: 3
        }
      ]
    },
    {
      name: 'Caffe Mocha',
      ingredients: [
        {
          ingredient: this.espresso,
          amountNeeded: 1
        },
        {
          ingredient: this.cocoa,
          amountNeeded: 1
        },
        {
          ingredient: this.steamedMilk,
          amountNeeded: 1
        },
        {
          ingredient: this.whippedCream,
          amountNeeded: 1
        }
      ]
    },
    {
      name: 'Cappuccino',
      ingredients: [
        {
          ingredient: this.espresso,
          amountNeeded: 2
        },
        {
          ingredient: this.steamedMilk,
          amountNeeded: 1
        },
        {
          ingredient: this.foamedMilk,
          amountNeeded: 1
        }
      ]
    }
  ];

  isDispensing: boolean = false;
  currentStock$: Observable<BaristamaticState>;
  currentStock: BaristamaticState | undefined;
  subscriptionCloser: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<{ baristamatic: BaristamaticState}>) {
    this.currentStock$ = this.store.select('baristamatic');
  }

  ngOnInit() {
    this.currentStock$.pipe(
      takeUntil(this.subscriptionCloser)
    ).subscribe((state) => {
      console.log("inside Subscribe");
      this.currentStock = state;
      console.log(state, this.currentStock);
    })
  }

  ngOnDestroy(): void {
      this.subscriptionCloser.next(true);
  }

  hasStock(drink: Drink): boolean {
    if(this.currentStock) {
    let isValid: boolean = true;
    drink.ingredients.forEach((i) => {
      if (i.amountNeeded > this.currentStock![i.ingredient.name as StateKey])
        isValid = false;
    })

    return isValid;
    } else {
      return false;
    }
  }

  getDrinkPrice(drink: Drink): number {
    let drinkPrice = 0;
    drink.ingredients.forEach((i) => {
      drinkPrice += (i.amountNeeded * i.ingredient.unitCost);
    })

    return drinkPrice;
  }

  dispenseDrink(drink: Drink) {
    this.store.dispatch(BaristaActions.dispenseDrink({drink}));

    // Set isDispensing to True to simulate a drink being dispensed.  Set back to false after 5 seconds.
    this.isDispensing = true;
    setTimeout(() => {
      this.isDispensing = false;
    }, 5000);
  }

  refillIngredients() {
    this.store.dispatch(BaristaActions.refillIngredients());
  }

  convertStringToReadable(input: string): string {
    return input
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
  }
}
