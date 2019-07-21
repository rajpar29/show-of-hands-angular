import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PollsService {
    pollList: any = [];

    constructor(private http: HttpClient) { }

    async getPolls() {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', localStorage.getItem("login_token"));
        console.log("in poll" + headers.get("Authorization"));

        var response = await this.http.get("http://localhost:8091/polls/allPolls", { headers: headers });
        response.subscribe((response) => {

            console.log(response);
            for (var pollIndex in response) {
                console.log(response[pollIndex]);
                this.pollList.push(response[pollIndex]);
            }
        });
        return this.pollList;
    }


}
