import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PollsService {
  pollList: any = [];
  constructor(private http: HttpClient) {}

  async getPolls(sorting:string) {
    this.pollList = [];
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("login_token"));
    var response = await this.http.get(
      "http://192.168.43.95:8091/polls/allPolls/" + sorting,
      { headers: headers }
    );
    response.subscribe(response => {
      for (var pollIndex in response) {
        this.pollList.push(response[pollIndex]);
      }
    });
    return this.pollList;
  }

  async getPoll(pollId: string) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("login_token"));
    var response = await this.http.get(
      "http://192.168.43.95:8091/polls/getPoll/" + pollId,
      { headers: headers }
    );
    return response.toPromise();
  }

  async upvote(pollId: string) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("login_token"));
    var response = await this.http.get(
      "http://192.168.43.95:8091/polls/upvote/" + pollId,
      { headers: headers }
    );
    return response.toPromise();
  }

  async downvote(pollId: string) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("login_token"));
    var response = await this.http.get(
      "http://192.168.43.95:8091/polls/downvote/" + pollId,
      { headers: headers }
    );
    return response.toPromise();
  }

  async createPost(body) {
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("login_token")
    });

    var response = await this.http.post(
      "http://192.168.43.95:8091/polls/createPost",
      body,
      {
        responseType: "text",
        observe: "response",
        withCredentials: true,
        headers: headers
      }
    );
    return response.toPromise();
  }

  async addComment(comment: string, pollId: string) {
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("login_token")
    });
    let body = new HttpParams();
    body = body.set("comment", comment);
    console.log(body);
    
    var response = await this.http.post(
      "http://192.168.43.95:8091/polls/makeComment/" + pollId,
      body,
      {
        observe: "response",
        withCredentials: true,
        headers: headers
      }
    );
    return response.toPromise();
  }

  async chooseOption(option: any, pollId: string){

    let headers = new HttpHeaders({
        Authorization: localStorage.getItem("login_token")
      });
      let body = new HttpParams();
      body = body.set("optionName", option.optionName);
      body = body.set("optionid", option.optionid);
      console.log(body);
      

      var response = await this.http.post(
        "http://192.168.43.95:8091/polls/chooseOption/" + pollId,
        body,
        {
          // responseType: 'text',
          observe: "response",
          withCredentials: true,
          headers: headers
        }
      );
      return response.toPromise();
  }

  async getImage(fileId:string) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("login_token"));
    var response = await this.http.get(
      "http://192.168.43.95:8091/images/getImage/" + fileId,
      { headers: headers,responseType:'text' }
    );
    return response.toPromise();
  }
  
  async uploadImage(file: File){
    console.log("file NAme in Create Poll :  " + file.name);

    let formData:FormData = new FormData();
    formData.append('file', file);
    console.log(formData);
    

    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("login_token"),
      });
      

      var response = await this.http.post(
        "http://192.168.43.95:8091/images/save/" ,
        formData,
        {
          
          observe: "response",
          withCredentials: true,
          responseType: 'text',
          headers: headers
        }
      );
      return response.toPromise();
  }
}
