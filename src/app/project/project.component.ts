import { ProjectEditComponent } from './project-edit/project-edit.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProjectMember } from './shared/project-member';
import { User } from './../users/user/user';
import { ProjectModel } from './shared/project.model';
import { ProjectService } from './shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatDialog, MatSnackBar } from '@angular/material';
import { UsersFiltersService } from '../task/shared/users-filters.service';
import { TaskService } from '../task/shared/task.service';

@Component({
    selector: 'tskr-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

    project: ProjectModel = new ProjectModel();
    members: ProjectMember[] = [];
    newUserEmail = '';

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    constructor(private route: ActivatedRoute,
        public dialog: MatDialog,
        private taskService: TaskService,
        private projectService: ProjectService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.projectService.getProjectDetails(+params['id']).subscribe(res => this.project = res);
            this.projectService.getAllMembers(+params['id']).subscribe(res => this.members = res);
        });
    }

    removeMember(member: any) {
        this.projectService.removeMember(member.id, this.project.id).subscribe();
        const index = this.members.indexOf(member, 0);
        this.members.splice(index, 1);
        this.taskService.setProjectChanged();
    }

    addMember() {
        this.projectService.addMember(this.newUserEmail, this.project.id).subscribe(res => {
            let newMembers = new ProjectMember();
            newMembers = res;
            this.members.push(newMembers);
            this.newUserEmail = '';
            this.taskService.setProjectChanged();
        });
    }

    editProject() {
        const dialogRef = this.dialog.open(ProjectEditComponent, {
            width: '480px',
            data: { description: this.project.description, name: this.project.name, id: this.project.id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.project.name = result.name;
                this.project.description = result.description;
                this.snackBar.open('Projekt został zapisany', '', { duration: 2000 });

            }
        });
    }
}

