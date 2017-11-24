import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../users/user/user.service';
import { AlertService } from '../../alert/alert.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'tskr-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    model: any = {};
    loading = false;

    formControl = new FormControl('', [
        Validators.required
    ]);

    emailFormControl = new FormControl('', [
        Validators.email,
        Validators.required
    ]);

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model).subscribe(
            data => {
                this.loading = false;
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
}
