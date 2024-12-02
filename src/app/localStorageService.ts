import { Injectable } from '@angular/core';
import {User} from "./users-list/user.interface";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  constructor() {}

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public setItem<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
