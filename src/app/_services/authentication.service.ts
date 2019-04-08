import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        let headers = new HttpHeaders();
    
        headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            let options = ({ headers: headers });
          return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
          //return this.http.post<any>(`http://localhost:8080/login`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    //console.log("In AuthService: set Item is: "+localStorage.getItem("currentUser"));

                }
        
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}