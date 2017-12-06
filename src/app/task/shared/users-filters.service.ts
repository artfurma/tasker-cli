import { Injectable } from '@angular/core';
import { User } from '../../users/user/user';
import { IControlPoint } from './task.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
import { UserService } from '../../users/user/user.service';
import { TaskService } from './task.service';

@Injectable()
export class UsersFiltersService {
    private Users: User[] = [];
    private Milestones: IControlPoint[] = [];
    UsersList$: Observable<User[]>;
    MilestonesList$: Observable<IControlPoint[]>;
    private listUsersObserver: Observer<User[]>;
    private listMilestonesObserver: Observer<IControlPoint[]>;
    
    constructor(private userService:UserService, private taskService:TaskService) {
        this.loadAllUsers();
        this.loadAllMilestones();
        this.UsersList$ = new Observable<User[]>(x => this.listUsersObserver = x).share();
        this.MilestonesList$ = new Observable<IControlPoint[]>(x => this.listMilestonesObserver = x).share();
    }


    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.Users = users; if(this.listUsersObserver!==undefined)this.listUsersObserver.next(this.Users);});
    }
    private loadAllMilestones() {
        this.taskService.getAllMilestones().subscribe(milestones => { this.Milestones = milestones; if(this.listMilestonesObserver!==undefined)this.listMilestonesObserver.next(this.Milestones);});
    }

    updateData(){
        this.loadAllUsers();
        this.loadAllMilestones();
        this.getList();
    }

    getList() {
        // Get the data from somewhere, i.e. http call
        //console.log(this.filteredTasks)
        if(this.listUsersObserver!==undefined)this.listUsersObserver.next(this.Users);
        if(this.listMilestonesObserver!==undefined)this.listMilestonesObserver.next(this.Milestones);
        // the important part is after getting the data you want, observer.next it
    }


    // updateUsers(item: User[]): void {
    //     this.filteredTasks = item;
    //     this.listObserver.next(this.filteredTasks);
    // }
    // updateMilestones(item: IControlPoint[]): void {
    //     this.filteredMilestones = item;
    //     this.listObserver2.next(this.filteredMilestones);
    // }
}