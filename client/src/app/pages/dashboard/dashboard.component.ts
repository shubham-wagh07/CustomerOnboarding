import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder) { 
    this.form = this.fb.group({
      'displayName': ['',Validators.required],
      'email' :['',Validators.required],
      'Password' :['',Validators.required],
      'confirm password' :['',Validators.required],
      'phone Number' :['',Validators.required]

    })
  }

  ngOnInit(): void {
  }
  Login (){
    alert("signup")
    
  }

}
