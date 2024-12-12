import { Injectable } from '@angular/core';

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
}
