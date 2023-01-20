import { Component } from '@angular/core';
import { FoodListService } from './services/food-list.service';
import { Food } from './interfaces/food.interface';
import { finalize, Observable } from 'rxjs';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  response$ = this.foodService.food;
  title = 'diet-trucker';
  selectedFood$: Observable<Food>;
  isLoading = false;

  constructor(private foodService: FoodListService, public dialog: MatDialog) {}

  getTitle(): string {
    return this.title;
  }

  addFood() {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.response$ = this.foodService.food;
      });
  }

  deleteFood(id: string) {
    this.isLoading = true;
    this.foodService
      .deleteFood(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.response$ = this.foodService.food;
      });
  }

  editFood(id: string) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: id,
      })
      .afterClosed()
      .subscribe(() => {
        this.response$ = this.foodService.food;
      });
  }
}
