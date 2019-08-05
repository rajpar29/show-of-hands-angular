import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async userLogin(username: string, password: string) {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);

    let response = await this.http.post("http://192.168.43.95:8091/users/userLogin", body, { observe: 'response', responseType: 'text', withCredentials: true });
    return response.toPromise().catch(err=>{
      return new HttpResponse({status:401,body:"Error Logging in"});
    });;
    
  }

  async signUp(username: string, password: string) {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);

    let response = await this.http.post("http://192.168.43.95:8091/users/createUser", body, { observe: 'response', responseType: 'text', withCredentials: true });
    return response.toPromise().catch(err=>{
      return new HttpResponse({status:500,body:"Error Creating"});
    });
    
  }

  async getUserDetails(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem("login_token"));
    let response = await this.http.get("http://192.168.43.95:8091/users/getUserDetail",{headers: headers} );
    return response.toPromise();
  }

  logout(){
    localStorage.removeItem("login_token");
  }
}
