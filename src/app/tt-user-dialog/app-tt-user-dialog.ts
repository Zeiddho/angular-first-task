import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


@Component({
  selector: 'app-tt-user-dialog',
  templateUrl: 'app-tt-user-dialog.html',
  styleUrl: 'app-tt-user-dialog.scss',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatFabButton,
    MatCardModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class AppTtUserDialog {
  constructor() {
    //   this.formTT.valueChanges.subscribe((formValue) => {
    //       console.log(formValue);
    // })
  }

  @Output()
  createUser = new EventEmitter();

  public formTT = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl(),
    website: new FormControl,
    companyName: new FormControl(),
  })

  submitForm(): void {
    const formValue = this.formTT.value
    const formattedValue = {
      ...formValue,
      company: {
        name: this.formTT.value.companyName
      }
    }
    delete formattedValue.companyName;
    this.createUser.emit({
      ...formattedValue, id: new Date().getTime(),
    });
  }
}


