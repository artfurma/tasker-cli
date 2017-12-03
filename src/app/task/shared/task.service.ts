import { ChangeStatusModel } from './change-status-model';
import { Injectable, Inject } from '@angular/core';
import { Task, IControlPoint, SavingTask, EditingTask } from './task.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Response, Headers, Request, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
@Injectable()
export class TaskService {

    public chosenTask: Task;
    list: Task[] = [];
    private deleteTaskURL = '/api/Task/';
    SharedTasksList$: Observable<Task[]>;
    private listObserver: Observer<Task[]>;

    constructor(private _http: HttpClient) {
        this.SharedTasksList$ = new Observable<Task[]>(x => this.listObserver = x).share();                
        this.getTasksDb().subscribe(res => {
            this.list = res;
            this.listObserver.next(this.list);
        });
    }
    isGut():boolean{
        return this.list.length>0;
    }

    getList():Task[]{
        return this.list;
    }

    updateList(){
        this.getTasksDb().subscribe(res => {
            this.list = res;
            this.listObserver.next(this.list);
            
        });
    }

    addTask(task: Task) {
        this.chosenTask.children.push(task);
        this.editTaskRecursive(this.list);
        this.listObserver.next(this.list);
    }

    editTask(task: EditingTask) {
        this.chosenTask.controlPointIds=task.ControlPointIds;
        this.chosenTask.description=task.Description;
        this.chosenTask.mainPerformer=task.MainPerformer;
        this.chosenTask.taskPerformers=task.TaskPerformers;
        this.chosenTask.statusId=task.TaskStatusId;
        this.chosenTask.title=task.Title;
        this.editTaskRecursive(this.list);
        this.listObserver.next(this.list);
    }

    getChosenTask(Id: number): Task {
        if (this.chosenTask == undefined) {
            this.chosenTask = this.takeTaskByID(this.list, Id);
        }
        return this.chosenTask;
    }


    takeTaskByID(list: Task[], Id: number): Task {
        let returnedTask: Task;
        list.forEach(task => {
            if (+task.id === +Id) {
                returnedTask = task;
            }
            if (returnedTask === undefined && task.children.length > 0) returnedTask = this.takeTaskByID(task.children, Id);
        });
        return returnedTask;
    }

    editTaskRecursive(list: Task[]) {
        list.forEach(task => {
            if (task.id === this.chosenTask.id) {
                task.controlPointIds = this.chosenTask.controlPointIds;
                task.children = this.chosenTask.children;
                task.description = this.chosenTask.description;
                task.mainPerformer = this.chosenTask.mainPerformer;
                task.parentTaskId = this.chosenTask.parentTaskId;
                task.taskPerformers = this.chosenTask.taskPerformers;
                task.statusId = this.chosenTask.statusId;
                task.title = this.chosenTask.title;
            } else {
                if (task.children.length > 0) {
                    this.editTaskRecursive(task.children);
                }
            }
        });
    }

    getTasksDb(): Observable<Task[]> {
        return this._http.get<Task[]>(`http://localhost:4200/api/task/gettasks`).catch(this.handleError);
    }
    getTask(id: number): Observable<Task> {
        return this._http.get<Task>(`http://localhost:4200/api/task/${id}`).catch(this.handleError);
    }
    getAllMilestones(): Observable<IControlPoint[]> {
        return this._http.get<IControlPoint[]>(`http://localhost:4200/api/milestones/getall`).catch(this.handleError);
    }

    saveNewTask(task: SavingTask): Observable<Task> {
        return this._http.post('http://localhost:4200/api/task', task).catch(this.handleError);
    }

    saveTask(task: EditingTask) {
        return this._http.put('http://localhost:4200/api/task', task).catch(this.handleError);
    }


    changeTaskStatus(statusModel: ChangeStatusModel) {
        return this._http.post('http://localhost:4200/api/task/status', statusModel).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    deleteTask(id: number) {
        return this._http.delete(this.deleteTaskURL + id).catch(this.handleError);
    }
}
