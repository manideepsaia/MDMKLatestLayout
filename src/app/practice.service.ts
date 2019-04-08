import { throwError } from 'rxjs';
import { Practice } from './_models/practice';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  practices: Practice[] = JSON.parse(localStorage.getItem('practices')) || [];
  constructor() { }

  getPractices() {
    if (!localStorage.practices) {
      localStorage.practices = JSON.stringify([]);
  }

  return JSON.parse(localStorage.practices);
  }

  create(Practice) {

    const newPractice  = Practice;
    const duplicatePractice = this.practices.filter(practices => practices.practiceName === newPractice.practiceName && practices.address1 === newPractice.address1).length;
    if (duplicatePractice) {
      return throwError({error : {message : 'Practice with name "' + newPractice.practiceName +  '" and with address "' + newPractice.address1 + ',' + newPractice.address2 + '" is already existing'}});
    }

    // save new practice
    newPractice.id = this.practices.length + 1;
    this.practices.push(newPractice);
    localStorage.setItem('practices', JSON.stringify(this.practices));
  }

  delete(id) {
    for (let i = 0; i < this.practices.length; i++) {
      const practice = this.practices[i];
      if (practice.id === id) {
          // delete user
          this.practices.splice(i, 1);
          localStorage.setItem('practices', JSON.stringify(this.practices));
          break;
      }
  }
  }

  update(updatePractice) {
    // let updatePractice = request.body

    for (let i = 0; i < this.practices.length; i++) {
        const practiceItem = this.practices[i];
      if (updatePractice.id === practiceItem.id) {
        this.practices[i] = updatePractice;
        this.setPractice(this.practices);
        return;
      }
    }
  }

  setPractice(practices) {
    localStorage.practices = JSON.stringify(practices);
  }


}
