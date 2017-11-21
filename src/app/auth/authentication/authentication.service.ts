import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';

// import { AppConfig } from '../../../app.config';

@Injectable()
export class AuthenticationService {
    // constructor(private http: Http, private config: AppConfig) { }
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:4200/api/user/authenticate', { username: username, password: password });

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


}
