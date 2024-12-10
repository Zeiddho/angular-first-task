import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LocalStorageService } from '../../services/localStorageService';
import { UsersApiService } from "../../services/user-api.service";
import { userActions } from "./users.action";
import {User} from "../../interfaces/user.interface";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService,
    private localStorageService: LocalStorageService,
  ) {}

  loadUsersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() =>
        this.usersApiService.getUsers().pipe(
          map((users: User[]) => {
            this.localStorageService.setItem('users-list', users);
            return userActions.loadUsersSuccess({ users });
          }),
          catchError((error) => of(userActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  editUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.edit),
      map((action) => {
          const currentUsers: User[] = this.localStorageService.getItem('users-list') || [];
          const updatedUsers = currentUsers.map((u) => u.id === action.user.id ? action.user : u );
          this.localStorageService.setItem('users-list', updatedUsers);
          return userActions.updateLocalStorage({users: updatedUsers})
      })
    )
  );

  createUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.create),
      map((action) => {
        const currentUsers: User[] = this.localStorageService.getItem('users-list') || [];
        const updatedUsers = [...currentUsers, action.user];
        this.localStorageService.setItem('users-list', updatedUsers);
        return userActions.updateLocalStorage({users: updatedUsers})
      })
    )
  );

  deleteUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.delete),
      map((action) => {
        const currentUsers: User[] = this.localStorageService.getItem('users-list') || [];
        const updatedUsers = currentUsers.filter(user => user.id !== action.id);
        this.localStorageService.setItem('users-list', updatedUsers);
        return userActions.updateLocalStorage({users: updatedUsers})
      })
    )
  );
}
