import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
//import { AppConfig } from '../app.config';
import { User } from './user';
 
@Injectable()
export class UserService {
    //constructor(private http: Http, private config: AppConfig) { }
    apiUrl:string;
    constructor(private http: Http) { 
        this.apiUrl= "http://localhost:4200/api";
    }
    getAll() {
        return this.http.get(this.apiUrl + '/user/getall', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get(this.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post(this.apiUrl + '/users/', user, this.jwt());
    }
 
    update(user: User) {
        return this.http.put(this.apiUrl + '/users/' + user.id, user, this.jwt());
    }
 
    delete(_id: string) {
        return this.http.delete(this.apiUrl + '/users/' + _id, this.jwt());
    }
 
    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}