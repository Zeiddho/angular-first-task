import {ChangeDetectionStrategy, Component, EventEmitter, inject} from "@angular/core";
import {AsyncPipe, NgFor} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {UsersService} from "../users.service";
import {FormsModule} from "@angular/forms";
import {User} from "./user.interface";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {AppTtUserDialog} from "../tt-user-dialog/app-tt-user-dialog";
import {CreateUserFormComponent} from "../create-user-dialog/create-user-dialog.component";
import {MatCardModule} from '@angular/material/card';

export interface CreateUserI {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule, MatFormField, MatInput, MatDialogContent, MatDialogActions, MatButton, MatDialogTitle, MatDialogClose, UserCardComponent, EditUserDialogComponent, AppTtUserDialog, CreateUserFormComponent, MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersListComponent{
  public readonly usersService = inject(UsersService);/*когда мы инджектим usersService, то в какой момент выполняется то что у него в конструкторе?*/
  public readonly users = this.usersService.users$;
  private readonly dialog = inject(MatDialog);
  private readonly createUserEvent = new EventEmitter();


  constructor() {
    this.usersService.loadUsers()
    // this.users.subscribe(
    //   users => console.log('NEW', users)
    // )
  }

  public editUsers(user: User) {/*33:00 look*/
    this.usersService.editUser(user)
  }

  private createUsers(user: User) {
    this.usersService.createUser(user)
  }

  public deleteUsers(id: number) {
    this.usersService.deleteUser(id);
  }

  public openCreateUserDialog(): void {/*когда нужно передавать внутрь*/
    const dialogRef =
      this.dialog.open(EditUserDialogComponent)

    dialogRef.afterClosed().subscribe((editResult): void => {
      if (editResult !== undefined) {
        this.createUserEvent.emit(editResult);
        this.createUsers(editResult);
      }
    });
  }

  forkUsers(forkedUser: CreateUserI) {
    this.usersService.createUserr(forkedUser);
    //   {
    //   id: new Date().getTime(),
    //   name: forkedUser.name,
    //   email: forkedUser.email,
    //   website: forkedUser.website,
    //   companyName: {
    //     name: forkedUser.company
    //   }
    // }
  }
}


