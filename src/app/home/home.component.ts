import { ProjectAddComponent } from './../project/project-add/project-add.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectService } from './../project/shared/project.service';
import { ProjectModel } from './../project/shared/project.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user/user.service';
import { User } from '../users/user/user';
import { UsersFiltersService } from '../task/shared/users-filters.service';
import { TaskService } from '../task/shared/task.service';

@Component({
    selector: 'tskr-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    userProjects: ProjectModel[] = [];

    constructor(private userService: UserService,
        private projectService: ProjectService,
        private filtersService :UsersFiltersService,
        private taskService: TaskService,
        private router: Router,
        public dialog: MatDialog) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.projectService.getProjectsFromUser(this.currentUser.id)
            .subscribe(res => { this.userProjects = res; });
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    goToTasks(projectId: number) {
        if(localStorage.getItem('currentProject')!==undefined){
            localStorage.removeItem('currentProject');   
            localStorage.setItem('currentProject', projectId.toString());
            this.filtersService.updateData();
            this.taskService.updateList();
        }
        else{
            localStorage.setItem('currentProject', projectId.toString());
            this.filtersService.updateData();
            this.taskService.updateList();            
        }
        this.router.navigate(['/tasks']);
    }

    goToSettings(projectId) {
        if(localStorage.getItem('currentProject')!==undefined){
            localStorage.removeItem('currentProject');
            localStorage.setItem('currentProject', projectId.toString());
            this.filtersService.updateData();
            this.taskService.updateList();
        }
        else{
            localStorage.setItem('currentProject', projectId.toString());
            this.filtersService.updateData();
            this.taskService.updateList();
        }
        this.router.navigate(['/project', projectId]);
    }

    addProject() {
        const dialogRef = this.dialog.open(ProjectAddComponent, {
            width: '480px',
            // data: { taskId: this.TaskID}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userProjects.push(result);
            }
        });
    }

    deleteProject(project: ProjectModel) {
        const index = this.userProjects.indexOf(project, 0);
        this.userProjects.splice(index, 1);
        this.projectService.deleteProject(project.id).subscribe();
    }

    changeAvatar() {
        console.log('test');
    }
}
