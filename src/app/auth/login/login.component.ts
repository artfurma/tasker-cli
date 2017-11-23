import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { AlertService } from '../../alert/alert.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    public user: any;
    public errorMsg = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    formControl = new FormControl('', [
        Validators.required
    ]);

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // domyślnie użytkownik jest wylogowany
        this.authenticationService.changeLoggedIn(false);
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password).subscribe(
            data => {
                const user = JSON.parse(JSON.stringify(data));
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.authenticationService.changeLoggedIn(true);
                }
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
                this.authenticationService.changeLoggedIn(false);
            });
    }
}
