import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/material.module';
import { DiaryTableComponent } from './components/diary-table/diary-table.component';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { FoodnamePipe } from 'src/app/shared/pipes/foodname.pipe';



@NgModule({
  declarations: [
    DiaryComponent,
    DiaryTableComponent,
    DiaryFormComponent,
    FoodnamePipe,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DiaryModule {}
