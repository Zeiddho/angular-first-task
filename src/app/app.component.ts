import {Component, ViewEncapsulation} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {UsersListComponent/*, Ww*/} from "./users-list/users-list.component";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UsersListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent{
  title = 'mentoring-first-project';
}



