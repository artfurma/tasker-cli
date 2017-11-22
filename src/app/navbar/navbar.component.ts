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

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout(); // TODO
  }

}
