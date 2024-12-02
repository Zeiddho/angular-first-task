import {inject, Injectable} from "@angular/core";
import {User} from "./users-list/user.interface";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "./localStorageService";
import {UsersApiService} from "./user-api.service";

@Injectable({providedIn: 'root'})
export class UsersService {
  private readonly usersSubject$ = new BehaviorSubject<User[]>([]); /* 56:00 Создайем реактивное состояние которое инициализорали пустым массивом. Это коробка с данными, в которой хранятся данные и на которую можно подписаться и получать обновления*/
  public readonly users$ = this.usersSubject$.asObservable();/*Создали возможность считывать состояние из внешних классов. При asObservable - можно подписаться но нельзя вызывать другие методы*/
  private localStorageKey = 'users-list';
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);

  public setDataToLocalStorage(usersData: User[]): void {/*наверх*/
    this.localStorageService.setItem<User[]>(this.localStorageKey, usersData);
    this.usersSubject$.next(usersData);
  }

  public loadUsers() {
    const cachedUsers = this.localStorageService.getItem<User[]>(this.localStorageKey);
    if (cachedUsers) {
      this.usersSubject$.next(cachedUsers)
    } else {
      this.usersApiService.getUsers().subscribe(
        (usersFromApi: User[]) => {
          this.setDataToLocalStorage(usersFromApi)
        }
      )
    }
  }

  public editUser(editedUser: User): void {
    const updatedUsers: User[] = this.usersSubject$.value.map((user: User) =>
      user.id === editedUser.id ? editedUser : user
    );
    this.setDataToLocalStorage(updatedUsers)
  }

  public createUser(user: User): void {
    const newUser: User = { ...user, id: new Date().getTime() };
    const updatedUsers: User[] = [...this.usersSubject$.value, newUser];
    this.setDataToLocalStorage(updatedUsers)
  }

  public deleteUser (id: number): void {
    const updatedUsers: User[] = this.usersSubject$.value.filter(
      (user: User) => user.id !== id
    );
    this.setDataToLocalStorage(updatedUsers)
  }

  // public editUser(editedUser: User) {
  //   this.usersSubject$.next(
  //     this.usersSubject$.value.map(
  //       user => {
  //         if(user.id === editedUser.id) {
  //           return editedUser
  //         } else {
  //           return user
  //         }
  //       }
  //     )
  //   )
  // }

  // public createUser(user: User) {
  //   this.usersSubject$.next(
  //     [...this.usersSubject$.value, user]
  //   )
  // }

  createUserr(user: any) {
    const existingUser = this.usersSubject$.value.find(
      currentEl => currentEl.name == user.name
    )
    if(existingUser !== undefined) {
      alert(('USER IS ON LIST'))
    } else {
      const newUser = { ...user, id: new Date().getTime() };
      console.log('NEW USER', newUser)
      this.usersSubject$.next([...this.usersSubject$.value, newUser]);
      alert('NEW USER IS ADDED TO THE LIST')
    }
  }
}

