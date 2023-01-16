import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
    private authServices:AuthService
  ) {
    this.form = this.fb.group({
      'email': ['',Validators.required],
    })
   }

  ngOnInit(): void {
  }
  login() {
    const data = this.form.value;
    this.authServices.signin(data)
      .subscribe(
      res => {
        alert("login success")
      },
        err => {
          alert("login failed")
      })
    }
  }


  