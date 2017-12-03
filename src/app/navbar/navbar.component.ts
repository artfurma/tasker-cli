import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../auth/authentication/authentication.service';

@Component({
  selector: 'tskr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  loggedUser = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn;
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser')).firstName
                    + ' ' + JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = this.authService.loggedIn;
  }

}
