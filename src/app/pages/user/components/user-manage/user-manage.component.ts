import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { IconsService } from '@shared/services/icons.service';
import { authTypes, statesSelect } from 'src/static-data/configs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'vex-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  icClose = IconsService.prototype.getIcon("icClose");
  inputType = "password";
  visible = false;
  icVisibility = IconsService.prototype.getIcon("icVisibility");
  icVisibilityOff = IconsService.prototype.getIcon("icVisibilityOff");
  states = statesSelect
  authTypes = authTypes
  mode: string = '';
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      userId: [0, [Validators.required]],
      userName: ['', [Validators.required]],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      image: [''],
      authType: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    public _dialogRef: MatDialogRef<UserManageComponent>
  ) {
    this.mode = data.mode;
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.userById(this.data.dialogConfig.data.userId);
    }
  }

  userById(userId: number): void {
    this._userService.userById(userId).subscribe((resp) => {
      this.form.patchValue({
        userId: resp.userId,
        userName: resp.userName,
        email: resp.email,
        image: resp.image,
        authType: resp.authType,
        state: resp.state,
      });
    });
  }

  selectedImage(file: File) {
    this.form.get("image").setValue(file);
  }

  userSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }

    const userId = this.form.get('userId').value;

    if (userId > 0) {
      this.userEdit(userId);
    } else {
      this.userRegister();
    }
  }

  userRegister(): void {
    this._userService.userRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

  userEdit(userId: number): void {
    this._userService.userEdit(userId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      // this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      // this.cd.markForCheck();
    }
  }

}
