import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import { Router } from '@angular/router';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    isAdmin;
    isDoctor;
    isAttorney;
    isMdmUser;

    constructor(private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(this.currentUser.role==="admin"){
            this.isAdmin = true;
        }else{this.isAdmin = false}
            
        if (this.currentUser.role === "doctor") {
            this.isDoctor =true;
        }else{this.isDoctor = false}

        if (this.currentUser.role === "attorney") {
            this.isAttorney = true;
        }else{this.isAttorney = false}
        
        if(this.currentUser.role === "mdmuser") {
            this.isMdmUser =true;
        }else{this.isMdmUser = false}                
    }

    ngOnInit() {
       // this.loadAllUsers();
    }

    deleteUser(id: number) {
     //   this.userService.delete(id).pipe(first()).subscribe(() => { 
           // this.loadAllUsers() 
       // });
    }

    logout(){
        this.authenticationService.logout();
        this.router.navigate(['login']);
    }

    private loadAllUsers() {
        this.users=this.userService.getAll()
        // .pipe(first()).subscribe(users => { 
        //     this.users = users; 
        // });
    }
}