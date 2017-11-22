import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(username: string, password: string) {
        this.loggedIn.next(true);
        return this.http.post('http://localhost:4200/api/user/authenticate', { username: username, password: password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
    }
}
