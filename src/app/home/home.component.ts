import { Component, OnInit } from '@angular/core';
import {  UserService } from "../users/user/user.service";
import {  User } from "../users/user/user";




@Component({
  selector: 'tskr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(_id: string) {
      this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
      this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
