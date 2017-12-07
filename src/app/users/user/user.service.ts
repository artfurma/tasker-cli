import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

    apiUrl: string;
    constructor(private http: HttpClient) {
        this.apiUrl = 'http://localhost:4200/api';
    }
    getAll() {
        return this.http.get<User[]>(this.apiUrl + '/user/getall/' + localStorage.getItem('currentProject'));
    }

    getById(_id: string) {
        return this.http.get<User>(this.apiUrl + '/user/' + _id);
    }

    create(user: User) {
        return this.http.post(this.apiUrl + '/user', user, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            responseType: 'text'
        });
    }

    update(user: User) {
        return this.http.put(this.apiUrl + '/user/' + user.id, user);
    }

    delete(_id: string) {
        return this.http.delete(this.apiUrl + '/user/' + _id);
    }

}
