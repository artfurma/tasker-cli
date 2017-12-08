import { TaskService } from './../shared/task.service';
import { YesNoModalComponent } from './../../modals/yes-no-modal/yes-no-modal.component';
import { StatusChooserComponent } from './../status-chooser/status-chooser.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../shared/task.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../users/user/user.service';

@Component({
    selector: 'tskr-task-thumbnail',
    templateUrl: './task-thumbnail.component.html',
    styleUrls: ['./task-thumbnail.component.scss'],
})
export class TaskThumbnailComponent implements OnInit {

    @Input() task: Task;
    deleteConfirm: boolean;
    mainPerformer: string;

    constructor(public dialog: MatDialog,
        private _navRoute: Router,
        public deleteDialog: MatDialog,
        private taskService: TaskService,
        private userService: UserService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        if (this.task.mainPerformer) {
            this.getMainPerformer(this.task.mainPerformer);
        }
    }

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

    deleteTask(ID: number): void {
        const dialogRef = this.deleteDialog.open(YesNoModalComponent, {
            width: '480px',
            data: { message: 'Czy na pewno chcesz usunać to zadanie?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.deleteTask(this.task.id).subscribe(res => {
                    this.taskService.deleteLocalTask(this.task);
                });
                this._navRoute.navigate(['/tasks/']);
                this.snackBar.open('Zadanie zostało usunięte', '', { duration: 2000 });
            }
        });
    }

    setChosenTask(task: Task) {
        this.taskService.chosenTask = task;
        this._navRoute.navigate(['/tasks', task.id]);
    }

    addSubtask(parentTask: Task) {
        this.taskService.chosenTask = parentTask;
        this._navRoute.navigate(['/tasks/new', parentTask.id]);
    }

    showChildernChange(task: Task) {
        if (task.showChildren === false && task.children.length !== 0) {
            task.showChildren = true;
        } else {
            task.showChildren = false;
        }
    }

    getMainPerformer(id: number) {
        this.userService.getById(id.toString()).subscribe(result => {
            this.mainPerformer = `${result.firstName} ${result.lastName}`;
        });
    }
}
