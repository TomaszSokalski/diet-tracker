import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  minPw: number = 6;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    combineLatest([
      this.form.get('password')?.valueChanges,
      this.form.get('repeatedPassword')?.valueChanges,
    ]).subscribe((v) => {
      console.log(v);
      // if (v[0] === v[1]) {
    });
  }

  onLoginClicked(): void {
    if (this.form.invalid) {
      console.log('U are not allowed to');
    }
    console.log('This form valid');
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
}
