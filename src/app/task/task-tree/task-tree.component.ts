import { TaskService } from './../shared/task.service';
import { Component, OnInit, Input } from '@angular/core';
import { Task, IControlPoint } from '../shared/task.model';
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

  list: Task[];
  UsersFilters: User[];
  MilestonesFilters: IControlPoint[];

  constructor(private _route: ActivatedRoute,
              private _taskService: TaskService,
              private _taskFiltersService:TaskFiltersService) {
                this.UsersFilters = new Array();
                this.MilestonesFilters= new Array();
               }

  ngOnInit() {
    // this.list = this._route.snapshot.data['tasks'];
    this._taskService.getTasksDb().subscribe(res => this.list = res);
    this._taskFiltersService.SharedList$.subscribe(lst => this.UsersFilters = lst);
    this._taskFiltersService.SharedList2$.subscribe(lst => this.MilestonesFilters = lst);

    this._taskFiltersService.getList();
  }
}
