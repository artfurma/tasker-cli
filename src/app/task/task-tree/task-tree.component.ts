import { TaskService } from './../shared/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tskr-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss']
})

export class TaskTreeComponent implements OnInit {

  list: Task[];
  constructor(private _route: ActivatedRoute,
              private _taskService: TaskService) { }

  ngOnInit() {
    // this.list = this._route.snapshot.data['tasks'];
    this._taskService.getTasksDb().subscribe(res => this.list = res);
  }
}
