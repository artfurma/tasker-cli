
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../users/user/user.service";
import { User } from "../../users/user/user";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TaskService } from "../shared/task.service";
import { IControlPoint } from '../shared/task.model';
import { TaskFiltersService } from "../shared/task-filters.service";

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


  constructor(private userService: UserService, private _swiperModule: SwiperModule, private _taskService: TaskService, private _taskFilterService:TaskFiltersService) { }

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllMilestones();
    this._taskFilterService.SharedList$.subscribe(lst => this.filteredUsers = lst);
    this._taskFilterService.SharedList2$.subscribe(lst => this.filteredMilestones = lst);
    this._taskFilterService.getList();    
  }


  changeUserFilter(_user: User) {
    if (this.filteredUsers.includes(_user)) {
      let i: number = 0;
      for (let usr of this.filteredUsers) {
        if (usr.username === _user.username) {
          this.filteredUsers.splice(i, 1);
          break;
        }
        i++;
      }
    } else {
      this.filteredUsers.push(_user);
    }
    this._taskFilterService.updateUsers(this.filteredUsers);
  }

  changeMilestoneFilter(_milestone: IControlPoint) {
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
    this._taskFilterService.updateMilestones(this.filteredMilestones);
    
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
