import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  isAdmin;
  isDoctor;
  isAttorney;
  isMdmUser;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private authService: AuthenticationService, private router: Router, private breakpointObserver: BreakpointObserver) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (this.currentUser.role === 'admin') {
            this.isAdmin = true;
        } else {this.isAdmin = false; }

        if (this.currentUser.role === 'doctor') {
            this.isDoctor = true;
        } else {this.isDoctor = false; }

        if (this.currentUser.role === 'attorney') {
            this.isAttorney = true;
        } else {this.isAttorney = false; }

        if (this.currentUser.role === 'mdmuser') {
            this.isMdmUser = true;
        } else {this.isMdmUser = false; }
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
}


}
