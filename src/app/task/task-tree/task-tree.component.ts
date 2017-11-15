import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tskr-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss']
})

export class TaskTreeComponent implements OnInit {

  tasks: Task[];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this._route.snapshot.data['tasks'];
  }
}
