import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observer } from 'rxjs';

@Injectable()
export class AuthenticationService {

    private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loggedIn: Observable<boolean> = this._loggedIn.asObservable();
    userName: String;
    private listObserver: Observer<String>;
    userNameList: Observable<String>;
    constructor(private http: HttpClient) {
        this.userNameList = new Observable<String>(x => this.listObserver = x).share();
    }

    changeLoggedIn(loggedIn: boolean) {
        if (loggedIn) this.userName = JSON.parse(localStorage.getItem('currentUser')).firstName + ' ' + JSON.parse(localStorage.getItem('currentUser')).lastName;
        this.listObserver.next(this.userName);
        this._loggedIn.next(loggedIn);
    }

    login(username: string, password: string) {
        return this.http.post('/api/user/authenticate', { username: username, password: password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.userName = null;
        this.listObserver.next(this.userName);
        // ustaw usera jako wylogowanego
        this.changeLoggedIn(false);
    }
}
