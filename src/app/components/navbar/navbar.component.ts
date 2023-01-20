import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodListService } from 'src/app/services/food-list.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  response$ = this.foodService.food;  

  constructor(private foodService: FoodListService, public dialog: MatDialog) {}

  ngOnInit(): void {}

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
}
