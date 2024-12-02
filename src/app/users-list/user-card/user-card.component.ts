import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {User} from "../user.interface";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    MatCardActions,
    MatButton,
    MatCard,
    MatCardContent
  ]
})

export class UserCardComponent {
  @Input()
  user!: User;/*так можно? в какой момент я е инициализирую*/

  @Output()
  deleteUserEvent = new EventEmitter();/*из дочернего компонента в родительский прокидываем событие*/

  @Output()
  private readonly dialog = inject(MatDialog);

  @Output()
  readonly editUserEvent = new EventEmitter();

  openEditDialog(): void {
    const dialogRef =
      this.dialog.open(EditUserDialogComponent, {
      data: {user: this.user},
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      console.log('МОДАЛКА ЗАКРЫЛАСЬ', editResult);
      if (editResult !== undefined) {
        this.editUserEvent.emit(editResult);
      }
    });
  }

  private snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000, // Длительность отображения уведомления
      panelClass: ['custom-snackbar'], // Применяем классы стилей
    });
  }

  openDeleteDialog(): void {
    const dialogRef =
      this.dialog.open(DeleteUserDialogComponent, {
        data: {user: this.user}
      });

    dialogRef.afterClosed().subscribe((deleteResult: boolean) => {
      if (deleteResult) {
        this.deleteUserEvent.emit(this.user.id);
        this.openSnackBar('Пользователь удален', 'Закрыть');
      }
    });
  }
}








