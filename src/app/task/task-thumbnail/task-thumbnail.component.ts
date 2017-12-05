import { TaskService } from './../shared/task.service';
import { YesNoModalComponent } from './../../modals/yes-no-modal/yes-no-modal.component';
import { StatusChooserComponent } from './../status-chooser/status-chooser.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../shared/task.model';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'tskr-task-thumbnail',
  templateUrl: './task-thumbnail.component.html',
  styleUrls: ['./task-thumbnail.component.scss']
})
export class TaskThumbnailComponent implements OnInit {

  deleteConfirm: boolean;
  @Input() task: Task;

  constructor(public dialog: MatDialog,
              private _navRoute: Router,
              public deleteDialog: MatDialog,
              private taskService: TaskService) { }

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

  deleteTask(ID:number): void {
    const dialogRef = this.deleteDialog.open(YesNoModalComponent, {
      width: '480px',
      data: { message: 'Czy aby na pewno chcesz usunać tego taska ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(this.task.id).subscribe(res=>{
          this.taskService.deleteLocalTask(this.task);
        });
        this._navRoute.navigate(['/tasks/']);            
      }
    });
  }

  setChosenTask(task: Task) {
    this.taskService.chosenTask = task;
  }

  showChildernChange(task: Task) {
    if (task.showChildren === false && task.children.length !== 0) {
      task.showChildren = true;
    }else {
      task.showChildren = false;
    }

  }
}
