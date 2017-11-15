import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TaskService } from './task.service';

@Injectable()
export class TaskResolverService implements Resolve<any> {

    constructor(private _taskService: TaskService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._taskService.getTask(route.params['id']);
    }
}
