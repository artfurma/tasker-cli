import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { UserService } from "../../users/user/user.service";
import { TaskService } from "../shared/task.service";
import { TaskStatus, Task, IControlPoint } from '../shared/task.model';
import { User } from '../../users/user/user';
@Component({
    selector: 'tskr-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
    private Task: Task;
    private TaskID: number;
    private Title: String;
    private ControlPointsInUse: IControlPoint[];
    private DaysRemaining: number[];
    private UserNames: String[];
    private AllUsers: User[];
    private Description: String;
    private Comments: String;
    private TaskStatus: string;
    private printStatus: string;
    private taskPerformers: User[];
    private mainPerformer: User;

    constructor(private _route: ActivatedRoute, private _navRoute: Router, private _taskService: TaskService, private _userService: UserService) {
        this.UserNames = new Array();
        this.DaysRemaining = new Array();
        this.ControlPointsInUse = new Array();
        this.AllUsers = new Array();
        this.taskPerformers = new Array();
    }

    ngOnInit() {
        this.taskPerformers.length = 0;
        this.ControlPointsInUse.length = 0;
        this._route.data.forEach((data) => {
            this._route.params.subscribe(params => this.TaskID = params['id']);

            this._taskService.getTask(this.TaskID).subscribe(task => {
                this.Task = task;
                this.Title = task.title;
                this.Description = task.description;
                this.ControlPointsInUse.length = 0;
                this.ControlPointsInUse = task.controlPointIds;
                this.taskPerformers.length = 0;
                this.taskPerformers = task.taskPerformers;
                this.TaskStatus=TaskStatus[task.taskStatusId];
                console.log(task)
                this.loadAllUsers(task.mainPerformer);
            });
            //     this._taskService.getAllMilestones().subscribe(milestones => { 
            //         this.AllControlPoints = milestones;
            //   });        
            //console.log("dupa")

            //console.log(this.Title)
            //   this.Description=details.description;
            //   this.Comments=details.comments;
            //   let users=details.users;
            //   this.TaskStatus=details.status;
            //   this.printStatus=TaskStatus[details.status].toString();
            //   console.log(this.TaskStatus);
            //   let ControlPoints=details.controlPoints;
            //   users.forEach(element => {this.UserNames.push(element.name)}); 
            //   ControlPoints.forEach(element => {this.ControlPoints.push(element.endDate)}); 
            //   this.ControlPoints.forEach(element => {
            //       let minus= new Date().getDate() -  +element.getDate();
            //       this.DaysRemaining.push(minus);
            //   });

        });
    }


    private loadAllUsers(mainPerformerID: number) {
        this._userService.getAll().subscribe(users => {
            this.AllUsers = users;
            this.AllUsers.forEach(element => {
                if (element.id === mainPerformerID) this.mainPerformer = element;
            });
        });
    }
    isMilestoneInUse(selecded: IControlPoint) {
        this.ControlPointsInUse.forEach(element => {
            if (selecded.id === element.id) return "primary";
        });
    }

    deleteTask() {
        //this._taskService.deleteTask(this.TaskID);
        this._navRoute.navigate(['/tasks']);
    }
    editTask() {
        this._navRoute.navigate(['/tasks/' + this.TaskID + '/edit']);
    }

}



