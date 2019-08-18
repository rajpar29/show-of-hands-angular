import { Component, OnInit, Input } from "@angular/core";
import { PollsService } from "src/app/services/polls.service";

@Component({
  selector: "app-poll-image",
  templateUrl: "./poll-image.component.html",
  styleUrls: ["./poll-image.component.css"]
})
export class PollImageComponent implements OnInit {
  @Input() poll: any;

  constructor(private pollService: PollsService) {}
  imageVariable: any;

  ngOnInit() {
    this.getPollImage();
  }

  getPollImage() {
    this.pollService
      .getImage(this.poll.imageUrl)
      .then(imageData => {
        this.imageVariable = "data:image/jpg;base64," + imageData;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
