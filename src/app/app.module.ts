import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskerMaterialModule } from './tasker-material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticationService } from "./auth/authentication/authentication.service";
import { UserService } from "./users/user/user.service";
import { AlertService } from "./alert/alert.service";
import {AuthGuard } from "./auth/guard/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TaskerMaterialModule,
    routing
  ],
  providers: [AuthenticationService,UserService,AlertService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
