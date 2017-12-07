import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { User } from '../../users/user/user';
import { IControlPoint } from './task.model';

@Injectable()
export class TaskFiltersService {
    private filteredTasks: User[] = [];
    private filteredMilestones: IControlPoint[] = [];
    SharedList$: Observable<User[]>;
    SharedList2$: Observable<IControlPoint[]>;
    private listObserver: Observer<User[]>;
    private listObserver2: Observer<IControlPoint[]>;
    
    constructor() {
        this.SharedList$ = new Observable<User[]>(x => this.listObserver = x).share();
        this.SharedList2$ = new Observable<IControlPoint[]>(x => this.listObserver2 = x).share();
    }


    getList() {
        this.listObserver.next(this.filteredTasks);
        this.listObserver2.next(this.filteredMilestones);
    }

    updateUsers(item: User[]): void {
        this.filteredTasks = item;
        this.listObserver.next(this.filteredTasks);
    }
    updateMilestones(item: IControlPoint[]): void {
        this.filteredMilestones = item;
        this.listObserver2.next(this.filteredMilestones);
    }
}