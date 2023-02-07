import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [DiaryComponent],
  imports: [CommonModule, DiaryRoutingModule, MatTableModule],
})
export class DiaryModule {}
