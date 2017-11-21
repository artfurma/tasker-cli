import { Component, OnInit } from '@angular/core';
import { SavingTask, IControlPointIds, IControlPoint,TaskStatus } from '../shared/task.model';
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
  private ParentTaskID: number;
  private Title: string;
  private ControlPointsInUse: IControlPointIds[];
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
    this.taskStatus = 1;
    
    this.keys=Object.keys(this.enumStatus).filter(Number);
  }

  ngOnInit() {
    console.log(this.keys)
    this.taskPerformers.length = 0;
    this.ControlPointsInUse.length = 0;
    this._route.data.forEach((data) => {
      this._route.params.subscribe(params => this.ParentTaskID = params['id']);
    });
    this.loadAllUsers();
    this.loadAllMilestones();
  }




  private loadAllUsers() {
    this._userService.getAll().subscribe(users => {
      this.AllUsers = users;
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
    if (this.taskPerformers.includes(selected)) {
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
    if (this.ChosedMilestones.includes(selected)) {
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
    console.log(this.AllUsers);
  }


  isMilestoneInChosen(selected: IControlPoint) {
    if (this.ChosedMilestones.includes(selected)) {
      return "primary";
    }
  }

  isUserInPerformers(selected: User) {
    if (this.taskPerformers.includes(selected)) {
      return "primary";
    }
  }

  deleteMainPerformer(){
    this.AllUsers.push(this.mainPerformer);    
    this.mainPerformer=undefined;
    this.enableDrop=true;
  }

  saveTask() {
    
    let savingTask:SavingTask= {
      parentTaskId:+this.ParentTaskID,
      description: this.Description,
      statusId: +this.taskStatus,
      title: this.Title,
      mainPerformer: +this.mainPerformer.id,
      taskPerformers: this.taskPerformers,
      controlPointIds: this.ChosedMilestones
    }
    console.log(savingTask)
  }
  cancel() {
    this._navRoute.navigate(['/tasks/']);
  }

}
