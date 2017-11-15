import { Injectable, Inject } from '@angular/core';
import { Task } from './task.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class TaskService {

    constructor(private _http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    getTasks(): Observable<Task[]> {
        return this._http.get(`${this.baseUrl}api/tasks`).map((response: Response) => {
            return <Task[]>response.json();
        }).catch(this.handleError);
    }

    getTask(id: number): Observable<Task> {
        return this._http.get(`${this.baseUrl}api/tasks/${id}`).map((response: Response) => {
            return <Task>response.json();
        }).catch(this.handleError);
    }

    saveTask(task: Task): Observable<Task> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post('/api/tasks', JSON.stringify(task), options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
