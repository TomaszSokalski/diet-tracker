import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { AuthState } from '../state/auth.state';
import { Login } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  minPw: number = 6;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authState: AuthState,
  ) {}

  ngOnInit(): void {
    this.initForm();
    combineLatest([
      this.password?.valueChanges,
      this.repeatedPassword?.valueChanges,
    ]).subscribe((value) => {
      console.log(value);
      // if (value[0] === value[1]) {
      // }
    });
  }

  get password() {
    return this.form.get('password');
  }

  get repeatedPassword() {
    return this.form.get('repeatedPassword');
  }

  onLoginClicked(): void {
    if (this.form.invalid) {
      console.log('U are not allowed to');
    }
    const payload = this.loginPayload(this.form);
    this.authState.postUser(payload);
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(this.minPw), Validators.required]],
      repeatedPassword: [
        null,
        [Validators.minLength(this.minPw), Validators.required],
      ],
    });
  }

  private loginPayload(form: FormGroup): Login {
    const { value } = form;
    return {
      name: value.name,
      email: value.email,
      password: value.password,
    };
  }
}
