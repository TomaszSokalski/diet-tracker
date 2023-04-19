import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '../state/auth.state';

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
  }

  get password() {
    return this.form.get('password');
  }

  get name() {
    return this.form.get('name')
  }

  onLoginClicked(): void {
    if (this.form.invalid) {
      return;
    }
    this.authState.postUser(this.form.value);
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
}