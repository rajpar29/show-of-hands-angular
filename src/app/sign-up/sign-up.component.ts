import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup: FormGroup;
  headers: string[];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar) {
    this.signUpFormGroup = _formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit() {
  }
  async onSubmit() {
    this.userService.signUp(this.signUpFormGroup.value.username, this.signUpFormGroup.value.password).then(
      (response) => {
        console.log(response);
        if (response.status == 200) {
          this._snackBar.open("Account Created","Ok",{duration: 3000});
          this.router.navigate(['/userLogin'])
        }
        else{
          this._snackBar.open("Account Cannot be Created","Try Again",{duration: 3000});
        }
      }
    )
  }
  login(){
    this.router.navigate(['/userLogin']);
  }

}
