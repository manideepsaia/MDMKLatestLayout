import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

 
  private Data = new BehaviorSubject<any>(null);
  public iData$ = this.Data.asObservable();
  constructor() { }

  
  setData(data) { 
    this.Data.next(data)
  }

}