import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { PollsService } from "src/app/services/polls.service";
import { MatSnackBar } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.css"]
})
export class CreatePollComponent implements OnInit {
  createPollFormGroup: FormGroup;
  headers: string[];
  optionList = [];
  imageVariable: any;
  file: File;
  fileId: string

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private pollService: PollsService,
    private _snackBar: MatSnackBar,
    private _DomSanitizationService: DomSanitizer
  ) {
    this.createPollFormGroup = _formBuilder.group({
      title: ["", Validators.required],
      description: [""],
      options: [""],
      poll_image: []
      // imageUrl: ["", Validators.required],
      // categories: ["", Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.optionList.length < 2) {
      this._snackBar.open("Please Give Atleast 2 Options", "Ok", {
        duration: 3000
      });
    } else {
      let pollToCreate = new HttpParams();

      console.log(this.createPollFormGroup.value);
      pollToCreate = pollToCreate.set(
        "title",
        this.createPollFormGroup.value.title
      );
      pollToCreate = pollToCreate.set(
        "description",
        this.createPollFormGroup.value.description
      );
      pollToCreate = pollToCreate.set("imageUrl", this.fileId);
      pollToCreate = pollToCreate.set(
        "options",
        JSON.stringify({ options: this.optionList })
      );
      pollToCreate = pollToCreate.set(
        "categories",
        JSON.stringify({ categories: ["cat 1", "cat2"] })
      );
      let response = this.pollService.createPost(pollToCreate);
      response
        .then(data => {
          this._snackBar.open("Poll Created", "Ok", { duration: 3000 });
          console.log(data);

          this.router.navigate(["/polls"]);
        })
        .catch(err => {
          this._snackBar.open("Error Creating Poll", "Ok", { duration: 3000 });
        });
    }
  }

  addCateg() {
    this.optionList.push({
      optionName: this.createPollFormGroup.value.options,
      optionId: this.optionList.length.toString()
    });
    this.createPollFormGroup.get("options").setValue("");
  }

  removeOption(index: number) {
    this.optionList.splice(index, 1);
  }
  close() {
    this.router.navigate(["polls"]);
  }

  fileChange(event) {
    console.log(event);

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      console.log(fileList);
      
      this.file = fileList[0];
      console.log("file NAme in Create Poll :  " + this.file.name);
      
    }
  }
  uploadImage() {
    console.log("in Upload Method: " + this.file.name);
    
    this.pollService.uploadImage(this.file).then(response => {
      this.fileId = response.body
      console.log( "File Id After Upload" + this.fileId);
      
      if (response.status == 200) {
        this.pollService
          .getImage(this.fileId)
          .then(imageData => {
            this.imageVariable = "data:image/jpg;base64," + imageData;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}


