
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../users/user/user.service";
import { User } from "../../users/user/user";
import { TaskService } from "../shared/task.service";
import { IControlPoint } from '../shared/task.model';
import { TaskFiltersService } from "../shared/task-filters.service";
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { UsersFiltersService } from '../shared/users-filters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tskr-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TaskMainComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  allMilestones: IControlPoint[] = [];
  filteredMilestones: IControlPoint[] = [];
  filteredUsers: User[] = [];
  closestMilestone: number;

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 4  ,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: true,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: false,
    pagination: null,
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
  };

  constructor(private userService: UserService,
              private _taskService: TaskService,
              private _navRoute: Router,
              private usermilestoneService: UsersFiltersService,
              private _taskFilterService: TaskFiltersService) { }

  ngOnInit() {
    if(localStorage.getItem('currentProject')===null)this._navRoute.navigate(['/']);
    
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
    if (this.filteredMilestones.includes(_milestone))
    {
      return "primary";
    }
  }

  private loadAllUsers() {
    this.usermilestoneService.UsersList$.subscribe(lst => {
      this.users = lst;
    });
  }
  private loadAllMilestones() {
    this.usermilestoneService.MilestonesList$.subscribe(lst => {
      this.allMilestones = lst;
      this.allMilestones = this.allMilestones.sort((n1, n2) => {
        const n1Any = n1 as any;
        const n1Date = new Date(n1Any.endDate);
        const n2Any = n2 as any;
        const n2Date = new Date(n2Any.endDate);
        if (n1Date > n2Date) {
            return 1;
        }
        if (n1Date < n2Date) {
            return -1;
        }
        return 0;
      });
      this.setClosestMilestone();
    });
    this.usermilestoneService.getList();
  }

  private setClosestMilestone() {
    let lastItem: Date;
    const thisDate = new Date();
    this.allMilestones.forEach(item => {
      const items = item as any;
      const date = new Date(items.endDate);
      if (date < thisDate) {
        console.log('przeszly');
      }else if (lastItem === undefined) {
        lastItem = date;
        this.closestMilestone = +items.id;
      }else if (date < lastItem) {
        lastItem = date;
        this.closestMilestone = +items.id;
      }
    });
  }
}
