import { createSelector } from '@ngrx/store';

import * as fromAppRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromFood from '../reducers/food.reducer';
import { FoodItem } from '../../../shared/models/foodItem.model';

export const getCompleteFoodState = createSelector(
  fromFeature.getFoodState,
  (state: fromFeature.FoodState) => state.foods,
  (state: fromFeature.FoodState) => state.signalR
);

export const getAllFoodEntities = createSelector(
  getCompleteFoodState,
  fromFood.getFoodItemEntities
);

export const getFoodItemsLoaded = createSelector(
  getCompleteFoodState,
  fromFood.getFoodItemsLoaded
);

export const getAllFoods = createSelector(getAllFoodEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getSelectedFood = createSelector(
  getAllFoodEntities,
  fromAppRoot.getRouterState,
  (entities, router): FoodItem => {
    return router.state && entities[router.state.params.foodId];
  }
);
