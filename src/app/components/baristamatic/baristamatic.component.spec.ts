/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BaristamaticComponent, Drink } from './baristamatic.component';
import { CommonModule } from '@angular/common';
import { BaristamaticState } from './store/baristamatic.reducer';

describe('BaristamaticComponent', () => {
  let component: BaristamaticComponent;
  let fixture: ComponentFixture<BaristamaticComponent>;
  let store: MockStore;
  const initialState: BaristamaticState = {
    coffee: 10,
    decafCoffee: 10,
    sugar: 10,
    cream: 10,
    steamedMilk: 10,
    foamedMilk: 10,
    espresso: 10,
    cocoa: 10,
    whippedCream: 10
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, CommonModule,],
      declarations: [ BaristamaticComponent ],
      providers: [ provideMockStore({ initialState })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaristamaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set isDispense on button click', () => {
    component.dispenseDrink(component.drinkOptions[0]);
    expect(component.isDispensing).toBeTrue();
  });

  it('should return false for hasStock if ingredients too low', () => {
    component.currentStock = {
      coffee: 2,
      decafCoffee: 10,
      sugar: 10,
      cream: 10,
      steamedMilk: 10,
      foamedMilk: 10,
      espresso: 10,
      cocoa: 10,
      whippedCream: 10
    };

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

    expect(component.hasStock(drink)).toBeFalse();
  });

  it('Should return correct price for a drink', () => {
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

    expect(component.getDrinkPrice(drink)).toEqual(2.75);
  })
});
