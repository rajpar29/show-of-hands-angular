import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  headers: string[];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService) {
    this.loginFormGroup = _formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit() {
  }
  async onSubmit() {
    this.userService.userLogin(this.loginFormGroup.value.username, this.loginFormGroup.value.password).then(
      (response) => {
        console.log(response);
        if (response.status == 201) {
          this._snackBar.open("Login Successful","Ok",{duration:3000})
          var token = response.headers.get("authorization");
          localStorage.setItem("login_token", token);
          this.router.navigate(['/polls'])
        }
        else{
          this._snackBar.open("Wrong Username/Password","Ok",{duration:3000});
        }
      }
    )
  }
  signup(){
    this.router.navigate(['/register']);
  }

}
