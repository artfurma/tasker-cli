import { Injectable, Inject } from '@angular/core';
import { Task, IControlPoint, SavingTask } from './task.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Response, Headers, Request, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class TaskService {

    constructor(private _http: HttpClient) {
    }

    // getTasks(): Observable<Task[]> {
    //     return this._http.get(`http://demo5516762.mockable.io/tasks`).map((response: Response) => {
    //         return <Task[]>response.json();
    //     }).catch(this.handleError);
    // }

    getTasksDb(): Observable<Task[]> {
        return this._http.get<Task[]>(`http://localhost:4200/api/task/gettasks`).catch(this.handleError);
    }
    getTask(id: number): Observable<Task> {
        return this._http.get<Task>(`http://localhost:4200/api/task/${id}`).catch(this.handleError);
    }
    getAllMilestones(): Observable<IControlPoint[]> {
        return this._http.get<IControlPoint[]>(`http://localhost:4200/api/milestones/getall`).catch(this.handleError);
    }
    saveNewTask(task: SavingTask){
        return this._http.post('http://localhost:4200/api/task', task).catch(this.handleError);
    }
    saveTask(task: Task){
        return this._http.post('http://localhost:4200/api/task', task).catch(this.handleError);
    }


    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
