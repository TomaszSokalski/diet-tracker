import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { FoodsRoutingModule } from './food-list-routing.module';
import { FoodsListComponent } from './foods-list.component';

@NgModule({
  declarations: [FoodsListComponent],
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
