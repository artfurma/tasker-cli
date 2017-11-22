import { ChangeStatusModel } from './../shared/change-status-model';
import { TaskService } from './../shared/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'tskr-status-chooser',
  templateUrl: './status-chooser.component.html',
  styleUrls: ['./status-chooser.component.scss']
})
export class StatusChooserComponent {

  status = 0;

  constructor(
    public dialogRef: MatDialogRef<StatusChooserComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    saveStatus() {
      if (this.status !== 0) {
        const status = new ChangeStatusModel();
        status.Status = this.status;
        status.TaskId = this.data.id;
        this.taskService.changeTaskStatus(status).subscribe();
        this.data.statusId = this.status;
      }
      this.dialogRef.close();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
