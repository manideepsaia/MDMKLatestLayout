import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
    selector: 'login',
    templateUrl: './login.component.html'
  })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: User;
    user: User[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public toastr: ToastrManager) {
            // console.log("In Constructor Local Storage is :"+localStorage);
          //  console.log("In Constructor: Current User value: "+localStorage.getItem('currentUser'));
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // to make the login function to wait so that the currentUser is set in the local storage
    waitLogin() {
        setTimeout(() => {
            console.log('waiting for the response');
        }, 5000);
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.waitLogin();
        this.loading = true;


        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(

                data => {
                    this.waitLogin();
                    console.log(data);
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    console.log('role: ', this.currentUser.role);
                    if (this.currentUser.role === 'admin') {
                        this.router.navigate(['admin']);
                    } else if (this.currentUser.role === 'attorney') {
                        this.router.navigate(['attorney']);
                    } else if (this.currentUser.role === 'doctor') {
                        this.router.navigate(['doctor']);
                    } else if (this.currentUser.role === 'mdmuser') {
                        this.router.navigate(['mdmuser']);
                    } else {
                        this.router.navigate(['']);
                    }
                },

               error => {
                    this.toastr.errorToastr(error, 'Authentication Failed');
                    // this.alertService.error(error);
                    this.loading = false;
                });
                /* error => {
                  this.alertService.error(error);
                this.loading = false;
                }); */


    }
}
