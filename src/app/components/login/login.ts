import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../services/index';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    model = new UserLogin();
    @ViewChild(NgForm)
    ngForm: NgForm;
    constructor(
            private authService: AuthenticationService,
            private router : Router
    ) {}

    login() {
        if (this.ngForm.form.invalid) {
            return;
        }
        this.authService.authenticate(this.model).
            then(success => {
                this.router.navigate(['/']);
            },
                error =>{
                // TODO treat identification error
            });
    }

    formErrors = {
        'username': '',
        'password': ''
    };

     ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.ngForm) {
        this.ngForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any) {
        if (!this.ngForm) { return; }
        const form = this.ngForm.form;

        for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    validationMessages = {
        'username': {
            'required': 'Username is required.'
        },
        'password': {
            'required': 'Password is required.'
        }
    };
}
