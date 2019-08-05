import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { PollsService } from "../services/polls.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-polls",
  templateUrl: "./polls.component.html",
  styleUrls: ["./polls.component.css"]
})
export class PollsComponent implements OnInit {
  currentUser: any;

  tempTest = ['button', 'button13', 'buttotnsadf1'];  

  constructor(
    private http: HttpClient,
    private router: Router,
    private pollService: PollsService,
    private userService: UserService
  ) {}
  pollList = [];

  ngOnInit() {
    this.userService.getUserDetails().then(user => {
      this.currentUser = user;
      this.pollService.getPolls().then(polls => {
        this.pollList = polls;
      });
    });
  }

  upvoteDownvoteDiff(index: number) {
    return this.pollList[index].upvotes - this.pollList[index].downvotes;
  }

  async upvote(index: number) {
    this.pollService.upvote(this.pollList[index]._id).then(updatedPoll => {
      this.pollList[index] = updatedPoll;
    });
  }

  async downvote(index: number) {
    this.pollService.downvote(this.pollList[index]._id).then(updatedPoll => {
      this.pollList[index] = updatedPoll;
    });
  }

  upvoteDownvoteColor(index: number, isUpvoteButton: boolean) {
    let color = this.ifUserUpvotedOrDownvoted(index, isUpvoteButton);
    return color;
  }

  ifUserUpvotedOrDownvoted(index, isUpvoteButton: boolean) {
    let poll = this.pollList[index];
    let userVote = poll.upvoteOrDownvotedBy.find(
      x => this.currentUser.username === x.username
    );
    if (userVote) {
      if (userVote.upvoted) {
        // user upvoted
        if (isUpvoteButton) {
          /// Check the button to return color for
          return "material-icons color_red"; // user upvoted retrurn red for upvote button
        } else {
          return "material-icons color_grey"; // // user upvoted retrurn grey for downvote button
        }
      } else {
        // user downvoted
        if (isUpvoteButton) {
          return "material-icons color_grey"; // user downvoted retrurn grey for upvote button
        }
        else{
          return "material-icons color_blue"; // user downvoted retrurn blue for downvote button
        }
      }
    } else {
      return "material-icons color_grey"; // No vote from user
    }
  }

  pollDetails(index: number) {
    this.router.navigate(["/polls/details/", this.pollList[index]._id]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["userLogin"]);
  }

  createPoll() {
    this.router.navigate(["polls/create"]);
  }

  optionSelectedDetails(optionButton: String, index: number) {
    let optionChoose = this.pollList[index].optionChoosen.find(
      x => x.username === this.currentUser.username
    );
    if (optionChoose == null) {
      return false;
    } else {
      if (optionChoose.optionName === optionButton) {
        return true;
      } else {
        return false;
      }
    }
  }

  selectOption(option, index: number) {
    this.pollService
      .chooseOption(option, this.pollList[index]._id)
      .then(response => {
        this.pollList[index] = response.body;
      });
  }
}
