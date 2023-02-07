import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsListComponent } from './foods-list.component';

const routes: Routes = [{ path: '', component: FoodsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsRoutingModule {}
