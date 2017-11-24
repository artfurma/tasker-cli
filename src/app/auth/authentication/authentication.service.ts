import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

    private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loggedIn: Observable<boolean> = this._loggedIn.asObservable();

    constructor(private http: HttpClient) { }

    changeLoggedIn(loggedIn: boolean) {
        this._loggedIn.next(loggedIn);
    }

    login(username: string, password: string) {
        return this.http.post('/api/user/authenticate', { username: username, password: password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        // ustaw usera jako wylogowanego
        this.changeLoggedIn(false);
    }
}
