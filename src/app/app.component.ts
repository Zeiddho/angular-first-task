import {Component, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {UsersListComponent/*, Ww*/} from "./users-list/users-list.component";
import {HeaderComponent} from "./header/header.component";
import {UsersService} from "./users.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UsersListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent{
  constructor(private usersService: UsersService) {}
  title = 'mentoring-first-project';
}



