import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = new UserRegistration();

    constructor(
        private registrationService: RegistrationService,
        private router : Router
    ) { }

    register() {
        if (this.ngForm.form.invalid) {
            return;
        }

        this.registrationService.usernameExists(this.model.username).
            then( data => {
                if (data) {
                        this.takenUsername("taken");
                } else {
                        this.registrationService.register(this.model)
                            .then( data => {
                                this.router.navigate(['/login']);
                        },
                        error => {
                            console.log("inner server error:"+error);
                        });
                }
            });
    }

    takenUsername(error) {
        if (!this.ngForm) { return; }
        const form = this.ngForm.form;
         // clear previous error message (if any)
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            if (field === "username") {
                const messages = this.validationMessages[field];
                this.formErrors[field] += messages[error] + ' ';
            }
        }
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
            'required': 'Username is required.',
            'taken' : 'Username is already taken'
        },
        'password': {
            'required': 'Password is required.'
        }
    };
}
