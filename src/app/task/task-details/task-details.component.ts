import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {  Router } from "@angular/router";

import { TaskService } from "../shared/task.service";
import { TaskStatus, Task } from '../shared/task.model';
@Component({
  selector: 'tskr-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  private Task: Task;
  private TaskID: number;
  private Title: String;
  private DaysRemaining: number[];
  private UserNames: String[];
  private Description: String;
  private Comments: String;
  private TaskStatus: TaskStatus;   
  private printStatus: string;
  private ControlPoints: Date[];
  constructor(private _route: ActivatedRoute,private _navRoute: Router, private _taskService: TaskService) {
      this.UserNames= new Array();
      this.ControlPoints= new Array();
      this.DaysRemaining= new Array();
  }

  ngOnInit() {
      this._route.data.forEach((data) => {
          this._route.params.subscribe(params => this.TaskID = params['task']);
          var details;
          this._taskService.getTask(1).subscribe(task => { this.Task = task; });
          
          
          if(this.Task!=null){
            console.log(this.Task);
              this.Title=details.title;
              this.Description=details.description;
              this.Comments=details.comments;
              let users=details.users;
              this.TaskStatus=details.status;
              this.printStatus=TaskStatus[details.status].toString();
              console.log(this.TaskStatus);
              let ControlPoints=details.controlPoints;
              users.forEach(element => {this.UserNames.push(element.name)}); 
              ControlPoints.forEach(element => {this.ControlPoints.push(element.endDate)}); 
              this.ControlPoints.forEach(element => {
                  let minus= new Date().getDate() -  +element.getDate();
                  this.DaysRemaining.push(minus);
              });
          }
      });
  }

  deleteTask(){
      //this._taskService.deleteTask(this.TaskID);
      this._navRoute.navigate(['/tasks']);
  }
  editTask(){
      this._navRoute.navigate(['/tasks/'+this.TaskID+'/edit']);
  }
}



