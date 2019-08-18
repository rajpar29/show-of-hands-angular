import { Component, OnInit, Input } from '@angular/core';
import { PollsService } from 'src/app/services/polls.service';

@Component({
  selector: 'app-poll-options',
  templateUrl: './poll-options.component.html',
  styleUrls: ['./poll-options.component.css']
})
export class PollOptionsComponent implements OnInit {


  @Input() poll: any;
  @Input() currentUser: any;
  constructor(private pollService: PollsService) { }

  ngOnInit() {
  }


  optionSelectedDetails(optionButton: String, index: number) {
    
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

  selectOption(option, index: number) {
    this.pollService
      .chooseOption(option, this.poll._id)
      .then(response => {
        this.poll = response.body;
      });
  }


}
