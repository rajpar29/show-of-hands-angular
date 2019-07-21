import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  headers: string[];

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.loginFormGroup = _formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit() {
  }
  async onSubmit() {
    let body = new HttpParams();

    console.log(this.loginFormGroup.value);
    body = body.set('username', this.loginFormGroup.value.username);
    body = body.set('password', this.loginFormGroup.value.password);

    // debugger
    var response = await this.http.post("http://localhost:8091/users/userLogin", body, { observe: 'response', responseType: 'text', withCredentials: true });
    response.subscribe((response) => {
      console.log(response);
      console.log(response.headers.keys());

      if (response.status == 201 || response.status == 200) {
        var token = response.headers.get("authorization");
        localStorage.setItem("login_token", token);
        this.router.navigate(['/polls'])
      }

    })



    

  }

}
