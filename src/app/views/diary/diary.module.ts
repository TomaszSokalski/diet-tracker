import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { FoodnamePipe } from '@shared/pipes/foodname.pipe';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { DiaryTableComponent } from './components/diary-table/diary-table.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';

@NgModule({
  declarations: [
    FoodnamePipe,
    DiaryComponent,
    DiaryTableComponent,
    DiaryFormComponent,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DiaryModule {}
