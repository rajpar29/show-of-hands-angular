import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PollsService } from '../services/polls.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router,
    private pollsServcie: PollsService
  ) { }
  pollList = [];

  ngOnInit() {
    this.pollsServcie.getPolls().then((polls) => {
      this.pollList = polls;
    });
    //this.fetchPolls()
  }

  async fetchPolls() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', localStorage.getItem("login_token"));
    // console.log("in poll" + headers.get("Authorization"));

    // var response = await this.http.get("http://localhost:8091/polls/allPolls", {headers : headers});
    // response.subscribe((response) => {

    //   console.log(response);
    //   for(var pollIndex in response){
    //     console.log(response[pollIndex]);        
    //     this.pollList.push(response[pollIndex]);
    //   }

    // })
  }

  upvoteDownvoteDiff(index: number) {
    return (this.pollList[index].upvotes - this.pollList[index].downvotes);
  }

  async upvote(index: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem("login_token"));
    var response = await this.http.get("http://localhost:8091/polls/upvote/" + this.pollList[index]._id, { headers: headers });
    response.subscribe((response) => {

      console.log(response);
      this.pollList[index] = response;

    });
  }

  async downvote(index: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem("login_token"));
    var response = await this.http.get("http://localhost:8091/polls/downvote/" + this.pollList[index]._id, { headers: headers });
    response.subscribe((response) => {
      console.log(response);
      this.pollList[index] = response;

    });
  }

  logout() {
    localStorage.removeItem("login_token");
    this.router.navigate(['userLogin']);
  }

  createPoll() {
    this.router.navigate(['polls/create']);

  }
}
