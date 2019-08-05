import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PollsService } from 'src/app/services/polls.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  createPollFormGroup: FormGroup;
  headers: string[];
  optionList = [];

  constructor(private _formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private pollService: PollsService,
              private _snackBar: MatSnackBar
  ) {
    this.createPollFormGroup = _formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      options: ["",],
      // imageUrl: ["", Validators.required],
      // categories: ["", Validators.required]
    })
  }

  ngOnInit() {
  }

  async onSubmit() {

   if(this.optionList.length < 2){
      this._snackBar.open("Please Give Atleast 2 Options", "Ok", {duration:3000})
   }
   else{
    let pollToCreate = new HttpParams();

    console.log(this.createPollFormGroup.value);
    pollToCreate = pollToCreate.set('title', this.createPollFormGroup.value.title);
    pollToCreate = pollToCreate.set('description', this.createPollFormGroup.value.description);
    pollToCreate = pollToCreate.set('imageUrl', "");
    pollToCreate = pollToCreate.set('options', JSON.stringify({ "options": this.optionList }));
    pollToCreate = pollToCreate.set('categories', JSON.stringify({ "categories": ["cat 1", "cat2"] }));
    this.pollService.createPost(pollToCreate);
   }

  }

  addCateg() {
    this.optionList.push({ optionName: this.createPollFormGroup.value.options, optionId: (this.optionList.length).toString() });
    this.createPollFormGroup.get('options').setValue('');
  }

  removeOption(index: number) {
    this.optionList.splice(index, 1);
  }
  close(){
    this.router.navigate(['polls']);
  }
}
