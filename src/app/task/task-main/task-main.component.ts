
import { Component, OnInit } from '@angular/core';
import {  UserService } from "../../users/user/user.service";
import {  User } from "../../users/user/user";
import { SwiperModule } from 'ngx-swiper-wrapper';


@Component({
  selector: 'tskr-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss']
})

export class TaskMainComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  filteredUsers: User [] = [];
  notFileterdUsers: User []=[];


  constructor(private userService: UserService, private _swiperModule: SwiperModule) { }

  changeUserFilter(_user:User){
    console.log(_user)
    if(this.filteredUsers.includes(_user)){
      let i:number=0;
      
      for (let usr of this.filteredUsers) {
          if (usr.username === _user.username) {
             this.filteredUsers.splice(i, 1);
             console.log(usr);
             break;
          }
          i++;
      }
    }else{
      this.filteredUsers.push(_user);
    }
    console.log(this.filteredUsers)
  }

  isUserInFilters(_user:User){
    if(this.filteredUsers.includes(_user)){
      return "primary";
    }
  }


  ngOnInit() {
    this.loadAllUsers();
    this.notFileterdUsers= [...this.users];
    console.log(this.notFileterdUsers);
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
}
}
