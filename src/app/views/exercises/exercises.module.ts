import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from './exercises.component';


@NgModule({
  declarations: [ExercisesComponent],
  imports: [CommonModule, ExercisesRoutingModule],
})
export class ExercisesModule {}
