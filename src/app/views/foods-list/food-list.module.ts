import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { FoodsRoutingModule } from './food-list-routing.module';
import { FoodsListComponent } from './foods-list.component';
import { AddEditFoodComponent } from './components/add-edit-food/add-edit-food.component';
import { FoodsTableComponent } from './components/foods-table/foods-table.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';

@NgModule({
  declarations: [FoodsListComponent, AddEditFoodComponent, FoodsTableComponent, FoodDetailComponent],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FoodsListModule {}
