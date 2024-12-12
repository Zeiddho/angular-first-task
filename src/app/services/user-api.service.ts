import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "../interfaces/user.interface";

@Injectable({providedIn: 'root'})
export class UsersApiService {
  readonly apiService = inject(HttpClient);

  public getUsers() {
    return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }
}

