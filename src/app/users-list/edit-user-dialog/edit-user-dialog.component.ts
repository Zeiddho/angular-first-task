import {Component, Inject, inject, OnInit, signal} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogClose, MatDialogRef,
} from "@angular/material/dialog";
import {User} from "../user.interface";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: 'edit-user-dialog.component.html',
  styleUrl: 'edit-user-dialog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatDialogClose, MatButton, MatError, MatFormField, MatInput, MatFormFieldModule, MatInputModule, NgStyle,],
})

export class EditUserDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
  ) {}

  public dialogRef = inject(MatDialogRef<EditUserDialogComponent>)

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required, Validators.minLength(2)]]
    });

    if(this.data?.user !== undefined) {
      this.form.patchValue({/*setValue*/
        name: this.data.user.name,
        email: this.data.user.email,
        website: this.data.user.website,
        companyName: this.data.user.company.name
      })
    }
  }

  public get userWithUpdatedFields(): User {
    return {
      ...this.form.value,
      id: this.data?.user?.id || new Date().getTime(),
      company: {
        name: this.form.value.companyName
      }
    } as User
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  reset() {
    this.form.reset()
  }
}

