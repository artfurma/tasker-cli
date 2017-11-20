import { Component, OnInit } from '@angular/core';
import { Task, IControlPointIds, IControlPoint } from '../shared/task.model';
import { User } from '../../users/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { UserService } from '../../users/user/user.service';

@Component({
  selector: 'tskr-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss']
})
export class TaskNewComponent implements OnInit {

  private Task: Task;
  private TaskID: number;
  private Title: String;
  private ControlPointsInUse: IControlPointIds[];
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
    });
    this.loadAllUsers();
  }




  private loadAllUsers() {
    this._userService.getAll().subscribe(users => {
      this.AllUsers = users;
    });
  }

  isMilestoneInUse(selecded: IControlPoint) {
    this.ControlPointsInUse.forEach(element => {
      if (selecded.id === element.ID) return "primary";
    });
  }

  saveTask() {
    //this._taskService.deleteTask(this.TaskID);
    this._navRoute.navigate(['/tasks']);
  }
  cancel() {
    this._navRoute.navigate(['/tasks/']);
  }

}
