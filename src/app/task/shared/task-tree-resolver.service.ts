import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskTreeResolverService implements Resolve<Task[]> {

    constructor(private _taskService: TaskService) { }

    resolve(): Observable<Task[]> {
        console.log("resolver")
        return this._taskService.getTasksDb();
    }
}
