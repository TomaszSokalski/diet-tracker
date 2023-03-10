import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'foods',
    loadChildren: () =>
      import('./views/foods-list/food-list.module').then(
        (m) => m.FoodsListModule
      ),
  },
  {
    path: 'diary',
    loadChildren: () =>
      import('./views/diary/diary.module').then((m) => m.DiaryModule),
  },
  {
    path: 'exercises',
    loadChildren: () =>
      import('./views/exercises/exercises.module').then(
        (m) => m.ExercisesModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
