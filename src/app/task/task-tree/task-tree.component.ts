import { TaskService } from './../shared/task.service';
import { Component, OnInit } from '@angular/core';
import { Task, IControlPoint, FilteredTask } from '../shared/task.model';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from "../../auth/guard/auth.guard";
import { TaskFiltersService } from "../shared/task-filters.service";
import { User } from '../../users/user/user';

@Component({
  selector: 'tskr-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss'],
  providers: [AuthGuard]
})

export class TaskTreeComponent implements OnInit {



  filters: TreeVisible[];
  list: Task[];
  filterdList: FilteredTask[];
  UsersFilters: User[];
  MilestonesFilters: IControlPoint[];

  constructor(private _route: ActivatedRoute,
    private _taskService: TaskService,
    private _taskFiltersService: TaskFiltersService) {
    this.UsersFilters = new Array();
    this.MilestonesFilters = new Array();

  }

  ngOnInit() {
    // this.list = this._route.snapshot.data['tasks'];
    this._taskService.getTasksDb().subscribe(res => {
    this.list = res;
      console.log(this.list);
    });
    this._taskFiltersService.SharedList$.subscribe(lst => {
      this.UsersFilters = lst;

      if (this.list != undefined) {
        this.buildVisibilityTree();
        console.log(this.filters);
      }
    });
    this._taskFiltersService.SharedList2$.subscribe(lst => {
      this.MilestonesFilters = lst;
      if (this.list != undefined) {
        this.buildVisibilityTree();
        console.log(this.filters);
      }

    });
  }

  buildVisibilityTree() {
    this.filters = new Array<TreeVisible>(this.list.length);
    let flag: boolean = false;
    this.list.forEach((task, index) => {
      if (task.children.length > 0) {
        let vis: boolean;
        this.filters[index] = new TreeVisible();
        this.filters[index].childrens = new Array<TreeVisible>(task.children.length);
        this.filters[index].visible = vis = this.makeVisibilityTree(task.children, this.filters[index].childrens);
        flag = vis || flag;
        if (!flag && index === task.children.length - 1)
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
        
        filters[index].visible = vis = this.makeVisibilityTree(task.children, filters[index].childrens);
        flag = vis || flag;
        if (!flag && index === task.children.length - 1) {
          flag = this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
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
    if (this.UsersFilters.length === 0 && task.taskPerformers.length > 0) {
      return true;
    }
    if (this.UsersFilters.length > 0 && task.taskPerformers.length === 0) {
      return false;
    }
    if (this.UsersFilters.length === 0 && task.taskPerformers.length === 0) {
      return true;
    }
    let flag: boolean = true;
    this.UsersFilters.forEach(user => {
      for (let i = 0; i < task.taskPerformers.length; i++) {
        if (task.taskPerformers[i].id !== user.id && i === task.taskPerformers.length - 1) flag = false;
      }
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
        if (task.controlPointIds[i].id !== milestone.id && i === task.controlPointIds.length - 1) flag = false;
      }
    });
    return flag;
  }
}




class TreeVisible {
  visible: boolean;
  childrens: TreeVisible[] = [];
  constructor() {

  }
}
