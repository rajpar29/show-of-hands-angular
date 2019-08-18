import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { PollsService } from "../services/polls.service";
import { UserService } from "../services/user.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-polls",
  templateUrl: "./polls.component.html",
  styleUrls: ["./polls.component.css"]
})
export class PollsComponent implements OnInit {
  currentUser: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private pollService: PollsService,
    private userService: UserService,
    private _DomSanitizationService: DomSanitizer
  ) {}
  pollList = [];
  imageList = [];

  ngOnInit() {
    this.userService.getUserDetails().then(user => {
      this.currentUser = user;
      this.getPolls("all");
    });
  }
  getPolls(sortingMethod) {
    this.pollService.getPolls(sortingMethod).then(polls => {
      // debugger
      this.pollList = polls;
      // this.getPollImage();
    });
  }
  pollCreationTime(index: number) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = new Date(this.pollList[index].pollMeta.time);
    return (
      date.getDate() +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }

  getPollImage(index: number) {
    
    // for (let index = 0; index < this.pollList.length; index++) {
      this.pollService
        .getImage(this.pollList[index].imageUrl)
        .then(imageData => {
          this.imageList[index] = "data:image/jpg;base64," + imageData;
        })
        .catch(err => {
          console.log(err);
        });
    // }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["userLogin"]);
  }

  createPoll() {
    this.router.navigate(["polls/create"]);
  }
}
// upvoteDownvoteDiff(index: number) {
//   return this.pollList[index].upvotes - this.pollList[index].downvotes;
// }

// async upvote(index: number) {
//   this.pollService.upvote(this.pollList[index]._id).then(updatedPoll => {
//     this.pollList[index] = updatedPoll;
//   });
// }

// async downvote(index: number) {
//   this.pollService.downvote(this.pollList[index]._id).then(updatedPoll => {
//     this.pollList[index] = updatedPoll;
//   });
// }

// upvoteDownvoteColor(index: number, isUpvoteButton: boolean) {
//   console.log("upDownColor");

//   let color = this.ifUserUpvotedOrDownvoted(index, isUpvoteButton);
//   return color;
// }

// ifUserUpvotedOrDownvoted(index, isUpvoteButton: boolean) {
//   console.log("upvoteDonvoteCheck");
//   let poll = this.pollList[index];
//   let userVote = poll.upvoteOrDownvotedBy.find(
//     x => this.currentUser.username === x.username
//   );
//   if (userVote) {
//     if (userVote.upvoted) {
//       // user upvoted
//       if (isUpvoteButton) {
//         /// Check the button to return color for
//         return "material-icons color_red"; // user upvoted retrurn red for upvote button
//       } else {
//         return "material-icons color_grey"; // // user upvoted retrurn grey for downvote button
//       }
//     } else {
//       // user downvoted
//       if (isUpvoteButton) {
//         return "material-icons color_grey"; // user downvoted retrurn grey for upvote button
//       }
//       else{
//         return "material-icons color_blue"; // user downvoted retrurn blue for downvote button
//       }
//     }
//   } else {
//     return "material-icons color_grey"; // No vote from user
//   }
// }

// pollDetails(index: number) {
//   this.router.navigate(["/polls/details/", this.pollList[index]._id]);
// }

// optionSelectedDetails(optionButton: String, index: number) {
//   console.log("optionDetails");

//   let optionChoose = this.pollList[index].optionChoosen.find(
//     x => x.username === this.currentUser.username
//   );
//   if (optionChoose == null) {
//     return false;
//   } else {
//     if (optionChoose.optionName === optionButton) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

// selectOption(option, index: number) {
//   this.pollService
//     .chooseOption(option, this.pollList[index]._id)
//     .then(response => {
//       this.pollList[index] = response.body;
//     });
// }

// this.pollList[index].imageurl

// this._DomSanitizationService.bypassSecurityTrustUrl(imageData);
