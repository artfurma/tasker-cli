import { Component, OnInit } from '@angular/core';
import { SavingTask, IControlPoint,TaskStatus, Task } from '../shared/task.model';
import { User } from '../../users/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { UserService } from '../../users/user/user.service';

@Component({
  selector: 'tskr-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  private Task : Task;
  private ParentTaskID: number;
  private TaskID: number;
  private Title: string;
  private ControlPointsInUse: IControlPoint[];
  private DaysRemaining: number[];
  private UserNames: String[];
  private AllUsers: User[];
  private Description: string;
  private Comments: String;
  private TaskStatus: string;
  private printStatus: string;
  private taskPerformers: User[];
  private mainPerformer: User;
  private AllMilestones: IControlPoint[];
  private ChosedMilestones: IControlPoint[];
  private enableDrop:boolean;
  private taskStatus:TaskStatus;
  private enumStatus: any;
  private keys: any;
  
  

  constructor(private _route: ActivatedRoute, private _navRoute: Router, private _taskService: TaskService, private _userService: UserService) {
    this.UserNames = new Array();
    this.DaysRemaining = new Array();
    this.ControlPointsInUse = new Array();
    this.AllUsers = new Array();
    this.taskPerformers = new Array();
    this.AllMilestones = new Array();
    this.ChosedMilestones = new Array();
    this.enableDrop=true;
    this.enumStatus = TaskStatus;
    
    this.keys=Object.keys(this.enumStatus).filter(Number);
  }

  ngOnInit() {

    this._route.data.forEach((data) => {
      this._route.params.subscribe(params => this.TaskID = params['id']);
      this._taskService.getTask(this.TaskID).subscribe(task => {
        this.Task = task;
        this.Title = task.title;
        this.Description = task.description;
        this.loadAllMilestones();
        this.ChosedMilestones = task.controlPointIds;
        this.taskPerformers = task.taskPerformers;
        this.taskStatus=this.enumStatus[task.taskStatusId];
        this.loadAllUsers(task.mainPerformer);
        console.log(task.taskStatusId)
    });
    });
        
    
    console.log(this.taskStatus)
    
  }




  private loadAllUsers(mainPerformerID: number) {
    this._userService.getAll().subscribe(users => {
        this.AllUsers = users;
        this.AllUsers.forEach(element => {
            if (element.id === mainPerformerID) this.mainPerformer = element;
        });
        this.deleteUserFromPerformers(this.mainPerformer);
    });
}

  private loadAllMilestones() {
    this._taskService.getAllMilestones().subscribe(milestones => { this.AllMilestones = milestones; });
  }

  userDropped(e: any){
    this.mainPerformer=e.dragData;
    this.deleteUserFromPerformers(this.mainPerformer);
    this.enableDrop=false;
    if (this.taskPerformers.includes(this.mainPerformer)) {
      let i: number = 0;
      for (let usr of this.taskPerformers) {
        if (usr.id === this.mainPerformer.id) {
          this.taskPerformers.splice(i, 1);
          break;
        }
        i++;
      }
    }
  }

  toggleUser(selected: User) {
    let flag:boolean=false;
    this.taskPerformers.forEach(element => {
      if(element.id===selected.id) flag=true;
    });
    if (flag) {
      let i: number = 0;
      for (let usr of this.taskPerformers) {
        if (usr.id === selected.id) {
          this.taskPerformers.splice(i, 1);
          break;
        }
        i++;
      }
    } else {
      this.taskPerformers.push(selected);
    }
  }

  toggleMilestone(selected: IControlPoint) {
    let flag:boolean=false;
    this.ChosedMilestones.forEach(element => {
      if(element.id===selected.id) flag=true;
    });
    if (flag) {
      let i: number = 0;
      for (let mil of this.ChosedMilestones) {
        if (mil.id === selected.id) {
          this.ChosedMilestones.splice(i, 1);
          break;
        }
        i++;
      }
    } else {
      this.ChosedMilestones.push(selected);
    }
  }

  deleteUserFromPerformers(user:User){
    if (this.AllUsers.includes(user)) {
      let i: number = 0;
      for (let usr of this.AllUsers) {
        if (usr.id === user.id) {
          this.AllUsers.splice(i, 1);
          break;
        }
        i++;
      }
    }
  }


  isMilestoneInChosen(selected: IControlPoint) {
    let flag:boolean=false;
    this.ChosedMilestones.forEach(element => {
      if(element.id===selected.id) flag=true;
    });
    if (flag) {
      return "primary";
    }
  }

  isUserInPerformers(selected: User) {
    let flag:boolean=false;
    this.taskPerformers.forEach(element => {
      if(element.id===selected.id) flag=true;
    });
    if (flag) {
      return "primary";
    }
  }

  deleteMainPerformer(){
    this.AllUsers.push(this.mainPerformer);    
    this.mainPerformer=undefined;
    this.enableDrop=true;
  }

  saveTask() {
    
    let savingTask:Task= {
      id: this.TaskID,
      title: this.Title,
      description: this.Description,
      parentTaskId:+this.ParentTaskID,
      controlPointIds: this.ChosedMilestones,
      mainPerformer: +this.mainPerformer.id,
      taskStatusId: this.taskStatus,
      taskPerformers: this.taskPerformers
      
    }
    this._taskService.saveTask(savingTask).subscribe();
    this._navRoute.navigate(['/tasks/']);
  }
  cancel() {
    this._navRoute.navigate(['/tasks/']);
  }

}
