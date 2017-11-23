import { Router } from '@angular/router';
import { ProjectService } from './../project/shared/project.service';
import { ProjectModel } from './../project/shared/project.model';
import { Component, OnInit } from '@angular/core';
import {  UserService } from '../users/user/user.service';
import {  User } from '../users/user/user';




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
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.projectService.getProjectsFromUser(this.currentUser.id)
                .subscribe(res => {this.userProjects = res; console.log(res); });
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    goToTasks(projectId: number) {
        this.router.navigate(['/tasks']);
    }

    goToSettings(projectId) {
        this.router.navigate(['/project', projectId]);
    }

}
