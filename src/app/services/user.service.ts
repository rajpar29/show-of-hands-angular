import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async userLogin(username: string, password: string) {

    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    var isLoggedin: boolean = false;

    // var response = 
    return this.http.post("http://localhost:8091/users/userLogin", 
                                        body, 
                                        { observe: 'response', responseType: 'text', withCredentials: true }
                                        ).toPromise();

    // response.subscribe((response) => {
    //   console.log(response);
    //   debugger
    //   console.log(response.headers.keys());
    //   console.log(response.status);
      
    //   if (response.status == 201 || response.status == 200) {
        
    //     var token = response.headers.get("authorization");
    //     localStorage.setItem("login_token", token);
    //     isLoggedin = true;
    //     console.log("200" );

    //   }
    //   else {
    //     isLoggedin = false;

    //   }
    // });
    // console.log("USER SERVICE: " + isLoggedin);

    // return isLoggedin;
  }
}
