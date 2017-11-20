
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../users/user/user.service";
import { User } from "../../users/user/user";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TaskService } from "../shared/task.service";
import { IControlPoint } from '../shared/task.model';


@Component({
  selector: 'tskr-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss']
})

export class TaskMainComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  allMilestones: IControlPoint[] = [];
  filteredMilestones: IControlPoint[] = [];
  filteredUsers: User[] = [];


  constructor(private userService: UserService, private _swiperModule: SwiperModule, private _taskService: TaskService) { }




  ngOnInit() {
    this.loadAllUsers();
    this.loadAllMilestones();
  }


  changeUserFilter(_user: User) {
    console.log(_user)
    if (this.filteredUsers.includes(_user)) {
      let i: number = 0;

      for (let usr of this.filteredUsers) {
        if (usr.username === _user.username) {
          this.filteredUsers.splice(i, 1);
          console.log(usr);
          break;
        }
        i++;
      }
    } else {
      this.filteredUsers.push(_user);
    }
  }

  changeMilestoneFilter(_milestone: IControlPoint) {
    console.log(_milestone.id)
    if (this.filteredMilestones.includes(_milestone)) {
      let i: number = 0;

      for (let mil of this.filteredMilestones) {
        if (mil.id === _milestone.id) {
          this.filteredMilestones.splice(i, 1);
          break;
        }
        i++;
      }
    } else {
      this.filteredMilestones.push(_milestone);
    }
  }



  isUserInFilters(_user: User) {
    if (this.filteredUsers.includes(_user)) {
      return "primary";
    }
  }

  isMilestoneInFilters(_milestone: IControlPoint) {
    if (this.filteredMilestones.includes(_milestone)) {
      return "primary";
    }
  }





  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
  private loadAllMilestones() {
    this._taskService.getAllMilestones().subscribe(milestones => { this.allMilestones = milestones; });
  }
}
