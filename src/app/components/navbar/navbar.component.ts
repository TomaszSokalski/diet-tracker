import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  openSidenav = false;
  title = 'food tracker';
  menuItems: string[] = ['home', 'foods', 'diary', 'exercises'];
}
