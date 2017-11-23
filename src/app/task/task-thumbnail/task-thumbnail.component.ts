import { StatusChooserComponent } from './../status-chooser/status-chooser.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../shared/task.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'tskr-task-thumbnail',
  templateUrl: './task-thumbnail.component.html',
  styleUrls: ['./task-thumbnail.component.scss']
})
export class TaskThumbnailComponent implements OnInit {

  @Input() task: Task;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  getDeadlineBadgeClass(): any {
    return 'bg-success';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StatusChooserComponent, {
      width: '250px',
      data: this.task
    });

    dialogRef.afterClosed().subscribe();
  }
}
