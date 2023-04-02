import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { FoodnamePipe } from '@shared/pipes/foodname.pipe';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { DiaryTableComponent } from './components/diary-table/diary-table.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class DiaryModule {}
