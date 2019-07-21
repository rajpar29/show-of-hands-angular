import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  createPollFormGroup: FormGroup;
  headers: string[];
  optionList = [];

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.createPollFormGroup = _formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      options: ["", ],
      // imageUrl: ["", Validators.required],
      // categories: ["", Validators.required]
    })
  }

  ngOnInit() {
  }

  async onSubmit() {

    let body = new HttpParams();

    console.log(this.createPollFormGroup.value);
    body = body.set('title', this.createPollFormGroup.value.title);
    body = body.set('description', this.createPollFormGroup.value.description);
    body = body.set('imageUrl', "");
    body = body.set('options', JSON.stringify({"options": this.optionList}));
    body = body.set('categories', JSON.stringify({ "categories": ["cat 1", "cat2"] }));

    let headers = new HttpHeaders({ "Authorization": localStorage.getItem('login_token') });
  
    var response = await this.http.post("http://localhost:8091/polls/createPost",
      body,
      {
        responseType: 'text',
        observe: 'response',
        withCredentials: true,
        headers: headers
      });
    response.subscribe((response) => {
      console.log(response.body);

    });
  }

  addCateg() {
    console.log(this.createPollFormGroup.value.options);
    this.optionList.push({ optionName: this.createPollFormGroup.value.options, optionId: (this.optionList.length).toString() });
    console.log(this.optionList.length - 1);

    console.log("optionLength " + JSON.stringify(this.optionList));
  }

  removeOption(index: number){
    this.optionList.splice(index,1);
  }


  // validateOptions() {
  //   if (this.optionList.length != 0) {
  //     return null;
  //   }
  //   else {
  //     return true;
  //   }
  // }

}
