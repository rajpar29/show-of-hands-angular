import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { PollsComponent } from './polls/polls.component';
import { CookieService } from 'ngx-cookie-service';
import { CreatePollComponent } from './polls/create-poll/create-poll.component';
import { MatChipsModule } from '@angular/material';
import { PollDetailsComponent } from './polls/poll-details/poll-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: 'userLogin',
    component: LoginComponent
  },

  {
    path: 'register',
    component: SignUpComponent
  },

  {
    path: 'polls',
    component: PollsComponent
  },
  {
    path: 'polls/create',
    component: CreatePollComponent
  },
  {
    path: 'polls/details/:pollId',
    component: PollDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PollsComponent,
    CreatePollComponent,
    PollDetailsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,


    
    RouterModule.forRoot(appRoutes),
  ],
  providers: [CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
