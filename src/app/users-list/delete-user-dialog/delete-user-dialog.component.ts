import {Component, Inject} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {User} from "../../interfaces/user.interface";

@Component({
  standalone: true,
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  styleUrls: ['./delete-user-dialog.component.scss']
})

export class DeleteUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {};

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
