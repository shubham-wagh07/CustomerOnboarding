import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form:FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth:AuthService
  ) { 
    this.form = this.fb.group({
      'displayName': ['',Validators.required],
      'email' :['',Validators.required],
      'Password' :['',Validators.required],
      'confirm password' :['',Validators.required],
      
    })
  }

  ngOnInit(): void {
  }
  signup() {
    const data = this.form.value;
    delete data ['confirm']
    this.auth.signup(data)
      .subscribe(
        res => {
          alert("success")
        },
        err => {
          alert("error")
        }
         )
  }
}
