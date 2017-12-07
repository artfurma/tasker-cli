import { Component, OnInit } from '@angular/core';
import { SavingTask, IControlPoint, TaskStatus, Task, EditingTask } from '../shared/task.model';
import { User } from '../../users/user/user';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { UserService } from '../../users/user/user.service';
import { UsersFiltersService } from '../shared/users-filters.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'tskr-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  private Task: Task;
  private ParentTaskID: number;
  private TaskID: number;
  private Title: string;
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
  private enableDrop: boolean;
  private taskStatus: TaskStatus;
  private enumStatus: any;
  private keys: any;



  constructor(private _route: ActivatedRoute, public snackBar: MatSnackBar, private usermilestoneService: UsersFiltersService, private _navRoute: Router, private _taskService: TaskService, private _userService: UserService) {
    this.UserNames = new Array();
    this.DaysRemaining = new Array();
    this.AllUsers = new Array();
    this.taskPerformers = new Array();
    this.AllMilestones = new Array();
    this.ChosedMilestones = new Array();
    this.enableDrop = true;
    this.enumStatus = TaskStatus;
    this.taskStatus = 1;

    this.keys = Object.keys(this.enumStatus).filter(Number);

    this._navRoute.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this._navRoute.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this._navRoute.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.taskPerformers.length = 0;
    this.ChosedMilestones.length = 0;
    this._route.data.forEach((data) => {
      this._route.params.subscribe(params => this.TaskID = params['id']);
      let task: Task;
      task = this._taskService.getChosenTask(this.TaskID);
      if (task != null) {
        this.ParentTaskID = task.parentTaskId;
        this.Task = task;
        this.Title = task.title;
        this.Description = task.description;
        this.ChosedMilestones = task.controlPointIds;
        this.taskPerformers = task.taskPerformers;
        this.TaskStatus = TaskStatus[task.statusId];
        this.loadAllUsers(task.mainPerformer);
        this.loadAllMilestones();
        this.usermilestoneService.getList();
      }
      else {
        this._navRoute.navigate(['/tasks']);
      }
    });
  }




  private loadAllUsers(mainPerformerID: number) {
    this.usermilestoneService.UsersList$.subscribe(users => {
      this.AllUsers = users.slice();
      this.AllUsers.forEach((element, index) => {
        if (element.id === mainPerformerID) {
          this.mainPerformer = element;
          this.AllUsers.splice(index, 1);
          return;
        }
      });
    });
  }
  private loadAllMilestones() {
    this.usermilestoneService.MilestonesList$.subscribe(lst => {
      this.AllMilestones = lst.slice();
      console.log(this.AllMilestones);
    });
  }

  userDropped(e: any) {
    this.mainPerformer = e.dragData;
    this.deleteUserFromPerformers(this.mainPerformer);
    this.enableDrop = false;
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

  deleteUserFromPerformers(user: User) {
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
    let flag: boolean = false;
    this.ChosedMilestones.forEach(element => {
      if (element.id === selected.id) flag = true;
    });
    if (flag) {
      return "primary";
    }
  }

  isUserInPerformers(selected: User) {
    let flag: boolean = false;
    this.taskPerformers.forEach(element => {
      if (element.id === selected.id) flag = true;
    });
    if (flag) {
      return "primary";
    }
  }

  deleteMainPerformer() {
    this.AllUsers.push(this.mainPerformer);
    this.mainPerformer = undefined;
    this.enableDrop = true;
  }


  saveTask() {

    let savingTask: EditingTask = {
      Id: this.TaskID,
      Title: this.Title,
      Description: this.Description,
      ParentTaskId: +this.ParentTaskID,
      ControlPointIds: this.ChosedMilestones,
      MainPerformer: this.mainPerformer ? +this.mainPerformer.id : null,
      TaskStatusId: this.enumStatus[this.TaskStatus],
      TaskPerformers: this.taskPerformers
    }
    console.log(savingTask);
    this._taskService.saveTask(savingTask).subscribe(res => {
      console.log(res);
      let newTask: Task;
      newTask = res;
      this._taskService.editTask(savingTask);
      console.log(newTask)
      this.snackBar.open('Zadanie zostalo zaktualizowane!', '', { duration: 2000 });
    });

    this._navRoute.navigate(['/tasks/']);
  }
  cancel() {
    this._navRoute.navigate(['/tasks/']);
  }

}
