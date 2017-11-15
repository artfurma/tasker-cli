import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../shared/task.model';

@Component({
  selector: 'tskr-task-thumbnail',
  templateUrl: './task-thumbnail.component.html',
  styleUrls: ['./task-thumbnail.component.scss']
})
export class TaskThumbnailComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() { }

  getDeadlineBadgeClass(): any {
    return 'bg-success';
  }
}
