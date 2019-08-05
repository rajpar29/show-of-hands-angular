import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PollsService } from "src/app/services/polls.service";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-poll-details",
  templateUrl: "./poll-details.component.html",
  styleUrls: ["./poll-details.component.css"]
})
export class PollDetailsComponent implements OnInit {
  pollId: string;
  poll: any;
  commentFormControl = new FormControl("");
  currentUser: any;
  isResultVisible: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pollService: PollsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.pollId = params.get("pollId");
      this.userService.getUserDetails().then(user => {
        this.currentUser = user;
        this.pollService.getPoll(this.pollId).then(poll => {
          this.poll = poll;
        });
      });
    });
  }

  upvoteDownvoteDiff(index: number) {
    return this.poll.upvotes - this.poll.downvotes;
  }

  async upvote(index: number) {
    this.pollService.upvote(this.poll._id).then(updatedPoll => {
      this.poll = updatedPoll;
    });
  }

  async downvote(index: number) {
    this.pollService.downvote(this.poll._id).then(updatedPoll => {
      this.poll = updatedPoll;
    });
  }


  upvoteDownvoteColor(isUpvoteButton: boolean) {
    let color = this.ifUserUpvotedOrDownvoted(isUpvoteButton);
    return color;
  }

  ifUserUpvotedOrDownvoted(isUpvoteButton: boolean) {
    let poll = this.poll;
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


  // To Add Comment in post
  async addComment() {
    this.pollService
      .addComment(this.commentFormControl.value, this.pollId)
      .then(response => {
        this.poll = response.body;
      });
  }

  // Used to check if user selected an option
  optionSelectedDetails(optionButton: String) {
    let optionChoose = this.poll.optionChoosen.find(
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

  // Switch Show Result Component
  resultViewSwitch(){
    this.isResultVisible = !this.isResultVisible;
  }

  // Return Voting percentage
  pollPercent(options, optionIndex){
    console.log(options);
    let per:number;
    let option = options[optionIndex];
    let totalVotes :number =0;
    options.forEach(pollOption => {
      totalVotes = totalVotes + pollOption.votes;      
    });
    console.log(option.optionName + option.votes + " " +  totalVotes);
    
    per = (option.votes/totalVotes)*100;    
    return Math.round(per);
  }

  // Select an option in Poll
  selectOption(option) {
    this.pollService.chooseOption(option, this.pollId).then(response => {
      this.poll = response.body;
    });
  }


}
