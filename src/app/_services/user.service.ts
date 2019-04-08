import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { throwError } from 'rxjs';
import { MaxLengthValidator } from '@angular/forms';

@Injectable()
export class UserService {

    users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    constructor(private http: HttpClient) { }

    getAll() {
       // return this.http.get<User[]>(`${environment.apiUrl}/users`);
       if (!localStorage.users) {
        localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    create(user: User) {
        // return this.http.post(`${environment.apiUrl}/admin/users`, user);
        const newUser  = user;
        const duplicateUser = this.users.filter(users => users.username === newUser.username).length;
            if (duplicateUser) {
                return throwError({error : {message : 'Practice with name "' + newUser.username + '" is already existing'}});
    }

    // save new practice
    newUser.id = this.users.length + 1;
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    }

    update(user: User) {
        // return this.http.post(`${environment.apiUrl}/users/`, user);
        for (let i = 0; i < this.users.length; i++) {
            const userItem = this.users[i];
          if (user.id === userItem.id) {
            this.users[i] = user;
            localStorage.users = JSON.stringify(this.users);
            return;
          }
        }
    }
    delete(id) {
        for (let i = 0; i < this.users.length; i++) {
          const user = this.users[i];
          if (user.id === id) {
              // delete user
              this.users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(this.users));
              break;
          }
      }
      }
  //  delete(id: number) {
     // return  this.users.splice(id,1);
   //    return this.http.delete(`${environment.apiUrl}/users/` + id);
   // }
}
