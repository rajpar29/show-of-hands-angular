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

const appRoutes: Routes = [
  {
    path: 'userLogin',
    component: LoginComponent
  },

  {
    path: 'polls',
    component: PollsComponent
  },
  {
    path: 'polls/create',
    component: CreatePollComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PollsComponent,
    CreatePollComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatChipsModule,
    
    RouterModule.forRoot(appRoutes),
  ],
  providers: [CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
