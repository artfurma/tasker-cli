import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class TokenService {

    constructor() { }



    getToken(): string {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null ) {
            return 'no token';
        }
        return currentUser.token;
    }

    isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return tokenNotExpired(null, token);
    }
}