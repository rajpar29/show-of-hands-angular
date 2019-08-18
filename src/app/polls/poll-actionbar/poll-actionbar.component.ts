import { Component, OnInit, Input } from '@angular/core';
import { PollsService } from 'src/app/services/polls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-actionbar',
  templateUrl: './poll-actionbar.component.html',
  styleUrls: ['./poll-actionbar.component.css']
})
export class PollActionbarComponent implements OnInit {
  @Input() poll: any;
  @Input() currentUser: any;

  constructor(private pollService: PollsService,private router: Router) { }

  ngOnInit() {
    
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

  upvoteDownvoteColor(index: number, isUpvoteButton: boolean) {
    
    let color = this.ifUserUpvotedOrDownvoted(index, isUpvoteButton);
    return color;
  }

  ifUserUpvotedOrDownvoted(index, isUpvoteButton: boolean) {
    
    let userVote = this.poll.upvoteOrDownvotedBy.find(
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

  pollDetails() {
    this.router.navigate(["/polls/details/", this.poll._id]);
  }

}
