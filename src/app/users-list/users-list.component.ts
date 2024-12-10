import {ChangeDetectionStrategy, Component, EventEmitter, inject} from "@angular/core";
import {AsyncPipe, NgFor} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {User} from "../interfaces/user.interface";
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {MatCardModule} from '@angular/material/card';
import {Store} from "@ngrx/store";
import {userActions} from "./store/users.action";
import {selectUsers} from "./store/users.selectors";
import {LocalStorageService} from "../services/localStorageService";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    UserCardComponent,
    EditUserDialogComponent,
    MatCardModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersListComponent{
  private readonly dialog = inject(MatDialog);
  private readonly createUserEvent = new EventEmitter();
  private readonly localStorageService = inject(LocalStorageService);
  private readonly store = inject(Store);
  public readonly usersFromSelector$ = this.store.select(selectUsers);

  constructor() {
    const cachedUsers: User[] | null = this.localStorageService.getItem<User[]>('users-list');
    console.log('Cached users from localStorage:', cachedUsers);

    if (cachedUsers) {
      this.store.dispatch(userActions.loadUsersSuccess({ users: cachedUsers }));
    } else {
      this.store.dispatch(userActions.loadUsers());
    }
  }

  public editUsers(user: User) {
    this.store.dispatch(userActions.edit({user}));
  }

  private createUsers(user: User) {
    this.store.dispatch(userActions.create({user}))
  }

  public deleteUsers(id: number) {
    this.store.dispatch(userActions.delete({id}))
  }

  public openCreateUserDialog(): void {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    const dialogRef =
      this.dialog.open(EditUserDialogComponent)

    dialogRef.afterClosed().subscribe((editResult): void => {
      if (editResult !== undefined) {
        this.createUserEvent.emit(editResult);
        this.createUsers(editResult);
      }
    });
  }
}
