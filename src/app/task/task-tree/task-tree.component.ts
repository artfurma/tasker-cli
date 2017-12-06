import { TaskService } from './../shared/task.service';
import { Task, IControlPoint, FilteredTask } from '../shared/task.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from "../../auth/guard/auth.guard";
import { TaskFiltersService } from "../shared/task-filters.service";
import { User } from '../../users/user/user';
import { UsersFiltersService } from '../shared/users-filters.service';

@Component({
  selector: 'tskr-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss'],
  providers: [AuthGuard]
})

export class TaskTreeComponent implements OnInit {


  allUsers: User[];
  filters: TreeVisible[];
  list: Task[];
  filterdList: FilteredTask[];
  UsersFilters: User[];
  MilestonesFilters: IControlPoint[];


  constructor(private _route: ActivatedRoute,
    private _taskService: TaskService,
    private _navRoute: Router,
    private usermilestoneService: UsersFiltersService,
    private _taskFiltersService: TaskFiltersService) {
    this.UsersFilters = new Array();
    this.MilestonesFilters = new Array();

    // this._navRoute.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // }
    // this._navRoute.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     // trick the Router into believing it's last link wasn't previously loaded
    //     this._navRoute.navigated = false;
    //     // if you need to scroll back to top, here is the right place
    //     window.scrollTo(0, 0);
    //   }
    // });
  }

  ngOnInit() {
    
    // if (this._taskService.isGut()) {
    //   this.list = this._taskService.getList();
    //   this.buildVisibilityTree();
    // }
    this._taskService.getList();    
    this.loadAllUsers();
    // this.list = this._route.snapshot.data['tasks']; 
    this._taskService.SharedTasksList$.subscribe(lst => {
      this.list = lst;
      this.buildVisibilityTree();
    });
    // this._taskFiltersService.SharedList$.subscribe(lst => {
    //   this.UsersFilters = lst;

    //   if (this.list !== undefined) {
    //     this.buildVisibilityTree();
    //   }
    // });
    this._taskFiltersService.SharedList2$.subscribe(lst => {
      this.MilestonesFilters = lst;
      if (this.list !== undefined) {
        this.buildVisibilityTree();
      }
    });
    this._taskService.getList();
    this._taskFiltersService.getList();
  }


  buildVisibilityTree() {
    this.filters = new Array<TreeVisible>(this.list.length);
    this.list.forEach((task, index) => {
      if (task.children.length > 0) {
        let vis: boolean;
        this.filters[index] = new TreeVisible();
        this.filters[index].childrens = new Array<TreeVisible>(task.children.length);
        this.filters[index].visible = vis = this.makeVisibilityTree(task.children, this.filters[index].childrens);
        if (!vis)
          this.filters[index].visible = this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
      } else {
        this.filters[index] = new TreeVisible();
        this.filters[index].visible = this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
      }
    });
  }

  makeVisibilityTree(list: Task[], filters: TreeVisible[]): boolean {
    let flag: boolean = false;
    let vis: boolean;
    list.forEach((task, index) => {
      if (task.children.length > 0) {
        filters[index] = new TreeVisible();
        filters[index].childrens = new Array<TreeVisible>(task.children.length);
        vis = this.makeVisibilityTree(task.children, filters[index].childrens);
        filters[index].visible = vis;
        flag = vis || flag;
        if (!flag) {
          flag = this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
          filters[index].visible = flag;
        }
      } else {
        filters[index] = new TreeVisible();
        vis = filters[index].visible = this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
        flag = vis || flag;
      }
    });
    return flag;
  }


  checkUsersFilters(task: Task): boolean {
    let allPerformers: User[] = [];
    allPerformers = task.taskPerformers.slice();
    if (this.allUsers)
      this.allUsers.forEach(element => {
        if (element.id === task.mainPerformer) allPerformers.push(element);
      });
    if (this.UsersFilters.length === 0 && allPerformers.length > 0) {
      return true;
    }
    if (this.UsersFilters.length > 0 && allPerformers.length === 0) {
      return false;
    }
    if (this.UsersFilters.length === 0 && allPerformers.length === 0) {
      return true;
    }
    let flag: boolean = true;
    this.UsersFilters.forEach(user => {
      //  if(!task.taskPerformers.some((el)=>{ return el.id ===user.id}))return false;
      for (let i = 0; i < allPerformers.length; i++) {
        if (allPerformers[i].id === user.id) return;
      }
      flag = false;
    });
    return flag;
  }


  checkMilestonesFilters(task: Task): boolean {
    if (this.MilestonesFilters.length === 0 && task.controlPointIds.length > 0) {
      return true;
    }
    if (this.MilestonesFilters.length > 0 && task.controlPointIds.length === 0) {
      return false;
    }
    if (this.MilestonesFilters.length === 0 && task.controlPointIds.length === 0) {
      return true;
    }
    let flag: boolean = true;
    this.MilestonesFilters.forEach(milestone => {
      for (let i = 0; i < task.controlPointIds.length; i++) {
        if (task.controlPointIds[i].id === milestone.id) return;
      }
      flag = false;
      // for (let i = 0; i < task.controlPointIds.length; i++) {
      //   if (task.controlPointIds[i].id !== milestone.id && i === task.controlPointIds.length - 1) flag = false;
      // }
    });
    return flag;
  }

  loadAllUsers() {
    this.usermilestoneService.UsersList$.subscribe(lst => {
      this.allUsers = lst;
    });
    this.usermilestoneService.getList();
  }
}




class TreeVisible {
  childrens: TreeVisible[] = [];
  visible: boolean;
  constructor() {
  }
}
