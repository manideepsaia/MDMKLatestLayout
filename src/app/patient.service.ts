import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { doc } from './_models/doc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { userInfo } from 'os';
import { User } from './_models';
import { Practice } from './_models/practice';
import { PracticeService } from './practice.service';
import { attorneydos } from './_models/attorneydos';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AssigndostoattorneyComponent } from './assigndostoattorney/assigndostoattorney.component';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  users: User[] = [];
  user: User[] = [];
  attorneypat: doc[] = [];
  practices: Practice[] = [];
  selectpatients: any[] = [];
patient: attorneydos[] = [];
doss: any;
indexx: any;
document: any;
nwdata: any;
// attorneyDos:attorneydos[];
// model:doc[]=[];
//  this.newpractice= JSON.parse(localStorage.practices);
ngOnInit() {
 // this.model =JSON.parse(localStorage.getItem('model')) ||[] ;
 // let patient =JSON.parse(localStorage.getItem('patients')) || [];
 // this.model=JSON.parse(localStorage.getItem('model')) || [];
}
// doctor: User[]=[];
  patientobj: doc[] = [];
  private attorneyDos = JSON.parse(localStorage.getItem('attorneydos')) || [];
  private patients = JSON.parse(localStorage.getItem('patients')) || [];
  private model = JSON.parse(localStorage.getItem('model')) || [];
  private currentuser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: HttpClient,
              private Practiceservice: PracticeService,
              public dialog: MatDialog ,
    ) {
     // this.model=JSON.parse(localStorage.getItem('model')) || [];
     }

  getPatients() {
    if (!localStorage.patients) {
      localStorage.patients = JSON.stringify([]);
    }
    return JSON.parse(localStorage.patients);
  }
  getPatientsByPractice(selectedPractice): any {
    // throw new Error("Method not implemented.");
 const patient = this.getPatients();
 let j = 0;
 for (let i = 0; i < patient.length; i++) {
   if (selectedPractice === patient[i].practice) {
    this.selectpatients[j] = patient[i];
    j++;
   }

 }
 console.log(' selected patients by practice ', this.selectpatients);
return this.selectpatients;

   }

  getDocument() {
    if (!localStorage.model) {
      localStorage.model = JSON.stringify([]);
    }
    return JSON.parse(localStorage.model);
  }
  getUser(role): User[] {
    let j = 0;
    let k = 0;
    const l = 0;
    this.users = JSON.parse(localStorage.getItem('users'));
   console.log('Users are ', this.users);
    for (let i = 0; i < this.users.length; i++) {
      if ( this.users[i].role === 'attorney' && role === 'attorney') {
        console.log('Role is ', role);
         this.user[j] = this.users[i];
         j++;
       //  return this.user;
      } else if (this.users[i].role === 'doctor' && role === 'doctor') {
        console.log('Role is ', role);
        this.user[k] = this.users[i];
        k++;
       // return this.user;
      } else {
    this.user = this.users;
      }
  }
  return this.user;
}


  create(Patient) {
    const newPatient  = Patient;
    const duplicatePractice = this.patients.filter(patients => patients.firstName === newPatient.firstName && patients.lastName === newPatient.lastName && patients.patientId === newPatient.patientId).length;
    if (duplicatePractice) {
      return throwError({error : {message : 'Patient with name "' + newPatient.practiceName +  '" and with id "' + newPatient.id + '" is already existing'}});
    }

    // save new practice
    newPatient.id = this.patients.length + 1;
    this.patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(this.patients));
  }
  assignAttorney(attorney: any, data: any): any {
    throw new Error('Method not implemented.');
  }
  update(updatePatient) {

    for (let i = 0; i < this.patients.length; i++) {
        const patientItem = this.patients[i];
      if (updatePatient.patientId === patientItem.patientId) {
        this.patients[i] = updatePatient;
        this.setPratients(this.patients);
        return;
      }
    }
  }
  updateattorneydos(updatedos) {

    for (let i = 0; i < this.attorneyDos.length; i++) {
        const patient = this.attorneyDos[i];
      if (updatedos.patientItem === patient.patientItem) {
        this.attorneyDos[i] = updatedos;
        this.setDos(this.attorneyDos);
        return;
      }
    }
  }
  updatedos(doc: any): any {
    // throw new Error("Method not implemented.");
    console.log('in update dos doc is', doc);
    console.log('in update dos model is', this.model);

    for (let i = 0; i < this.model.length; i++) {
      const patientr = this.model[i];
     // console.log('patientItem is ', patientr.patientItem.patientId)
    //  console.log('doc.patid is ', doc.patientId)

  // if(doc.patientId === patientr.patientId){

   // if(doc.patientItem === patientItem){
    if (doc.patientItem === patientr.patientItem) {
      this.model[i] = doc;
      this.setupdateddos(this.model);
      return;
    }
  }
  }
  getPatient(id) {
    if (id = 'patientID') {
      console.log('in get by');
      return this.get(this);
  } else if (id === 'firstName') {
   return this.getByPatientFirstName(id);
         } else {
    return this.getByPatientLastName(id);
         }
  }

 getPatientById(PatientId) {
   console.log('in patient service id is and mapdoc are', PatientId, this.model);
  // this.practices= this.Practiceservice.getPractices();

    let j = 0;
   // if(patientId==this.patientobj[i])
    for (let i = 0; i < this.model.length; i++) {
   const patientR = this.model[i];
  // if(PatientId == patientR.patientItem.patientId){
    if (PatientId === patientR.patientItem) {
  this.patientobj[j] = patientR;
  // console.log(this.patients);
  // return patientR;

  i = this.model.length;
  j++;
   }
   }
  // console.log(this.patientobj);
   return this.patientobj;
   }




   getByPatientFirstName(PatientName) {
   for (let i = 0; i < this.patients.length; i++) {
   const patientItem = this.patients[i];
   if (PatientName === patientItem.PatientName) {
   return this.patients[i];
   }
   }
}

getByPatientLastName(PatientName) {
  for (let i = 0; i < this.patients.length; i++) {
 const patientItem = this.patients[i];
 if (PatientName === patientItem.PatientName) {
 return this.patients[i];
 }
 }
}




getPatientsbyattorney1(patientId) {
  let patientR;
  console.log('currentuser is  ', this.currentuser.role);
  if (this.currentuser.role === 'admin' || this.currentuser.role === 'mdmuser') {
    console.log('user is either admin or mdmuser ', this.currentuser.role);
    return this.model;
  }
  console.log('user is either attorney or doctor ', this.currentuser.role);
  for (let i = 0; i < this.model.length; i++) {
    patientR = this.model[i];
    if (patientId === patientR.patientItem.patientId) {
      console.log(patientR.patientItem.patientId);

    for (let j = 0; j < patientR.attorney.length; j++) {

    if (patientR.attorney[j].username !== this.currentuser.username /*&& patientItem.attorney.password==*/) {
      patientR.attorney.splice(j, 1);
      patientR.dosFrom.splice(j, 1);
      patientR.dosTo.splice(j, 1);
      patientR.documentTypes.splice(j, 1);
      patientR.pageNumber.splice(j, 1);
    }
  }
  console.log(patientR.patientItem);
  if (patientR.attorney) {
  this.attorneypat[i] = patientR;
   }
}
    return this.attorneypat;
    }
  }

 /* getPatientByIdfrdis(PatientId) {
    console.log('in patient service id is and mapdoc are', PatientId, this.model);
    // this.practices= this.Practiceservice.getPractices();

    let j = 0;
    let patientR;
    let dummyArray;
    // if(patientId==this.patientobj[i])
    for (let i = 0; i < this.model.length; i++) {
      patientR = this.model[i];
      // if(PatientId == patientR.patientItem.patientId){
      if (PatientId === patientR.patientItem) {
        // this.patientobj[j] = patientR;
        // console.log(this.patients);
        console.log(patientR);
        dummyArray = patientR;
        dummyArray.dosNewFrom = dummyArray.dosFrom.filter((x, i, a) => a.indexOf(x) == i);
        dummyArray.dosNewTo = dummyArray.dosTo.filter((x, i, a) => a.indexOf(x) == i);
        dummyArray.newDocType=[];
        var newDoctypes= [];
        var indexValue = 0;
        if (dummyArray.dosNewFrom.length === dummyArray.dosNewTo.length) {
          for(var index=0;index<dummyArray.dosNewFrom.length;index++){
            //indexValue = 0;
            for(var newIndex = 0;newIndex<patientR.dosFrom.length;newIndex++){
              if(dummyArray.dosNewFrom[index]+dummyArray.dosNewTo[index]==patientR.dosFrom[newIndex]+patientR.dosTo[newIndex]){
                newDoctypes.push(patientR.documentTypes[newIndex])
              }
            }
            dummyArray.newDocType.push({dosFrom:dummyArray.dosNewFrom[index],dosTo:dummyArray.dosNewTo[index],DocType:newDoctypes});
            newDoctypes = [];
          }
        }
        console.log(dummyArray)
        return dummyArray;

        // i=this.model.length;
        // j++;
      }
    }
    // console.log(this.patientobj);
    // return this.patientobj;
  }*/

/*  getPatientByIdfrdis(PatientId) {
    console.log('in patient service id is and mapdoc are', PatientId, this.model);
    // this.practices= this.Practiceservice.getPractices();

    let j = 0;
    let patientR;
    let dummyArray;
    // if(patientId==this.patientobj[i])
    for (let i = 0; i < this.model.length; i++) {
      patientR = this.model[i];
      // if(PatientId == patientR.patientItem.patientId){
      if (PatientId === patientR.patientItem) {
        // this.patientobj[j] = patientR;
        // console.log(this.patients);
        console.log(patientR);
        dummyArray = patientR;
        dummyArray.newDocType = [];
        var newDoctypes = [];
        var newPageNumbers = [];
        for (var newIndex = 0; newIndex < patientR.dosFrom.length; newIndex++) {
          if (newIndex === 0) {
            dummyArray.newDocType.push({ dosFrom: patientR.dosFrom[newIndex], dosTo: patientR.dosTo[newIndex] });
          } else {
            for (var index = 0; index < dummyArray.newDocType.length; index++) {
              if (dummyArray.newDocType[index].dosFrom === patientR.dosFrom[newIndex]) {
              } else {
                dummyArray.newDocType.push({ dosFrom: patientR.dosFrom[newIndex], dosTo: patientR.dosTo[newIndex] });
                break;
              }
            }
          }
        }
        for (var newIndex = 0; newIndex < dummyArray.newDocType.length; newIndex++) {
          for (var index = 0; index < patientR.dosFrom.length; index++) {

            if (dummyArray.newDocType[newIndex].dosFrom + dummyArray.newDocType[newIndex].dosTo === patientR.dosFrom[index] + patientR.dosTo[index]) {
              newDoctypes.push(patientR.documentTypes[index]);
              newPageNumbers.push(patientR.pageNumber[index]);
            }
          }
          dummyArray.newDocType[newIndex].pageNumber = newPageNumbers;
          dummyArray.newDocType[newIndex].docType = newDoctypes; //.push({ dosFrom: patientR.dosFrom[newIndex], dosTo: patientR.dosTo[newIndex],docType: });
          newDoctypes = [];
          newPageNumbers = [];
        }
        console.log(dummyArray)
        return dummyArray;

        // i=this.model.length;
        // j++;
      }
    }
    // console.log(this.patientobj);
    // return this.patientobj;
  }
*/





getPatientByIdfrdis(PatientId) {
  console.log('in patient service id is and mapdoc are', PatientId, this.model);
  // this.practices= this.Practiceservice.getPractices();

  const j = 0;
  let patientR;
  let dummyArray;
  // if(patientId==this.patientobj[i])
  for (let i = 0; i < this.model.length; i++) {
    patientR = this.model[i];
    // if(PatientId == patientR.patientItem.patientId){
    if (PatientId === patientR.patientItem) {
      // this.patientobj[j] = patientR;
      // console.log(this.patients);
      console.log(patientR);
      dummyArray = patientR;
      dummyArray.newDocType = [];
      let newDoctypes = [];
      let newPageNumbers = [];
      for (let newIndex = 0; newIndex < patientR.dosFrom.length; newIndex++) {
        if (newIndex === 0) {
          dummyArray.newDocType.push({ dosDate: patientR.dosFrom[newIndex] + ' To ' + patientR.dosTo[newIndex] });
        } else {
          for (let index = 0; index < dummyArray.newDocType.length; index++) {
            if (dummyArray.newDocType[index].dosDate === patientR.dosFrom[newIndex] + ' To ' + patientR.dosTo[newIndex] ) {
            } else {
              dummyArray.newDocType.push({ dosDate: patientR.dosFrom[newIndex] + ' To ' + patientR.dosTo[newIndex] });
              break;
            }
          }
        }
      }
      console.log(dummyArray.newDocType);
      const unique = dummyArray.newDocType.map(item => item.dosDate).filter((value, index, self) => self.indexOf(value) === index);
      // = [...new Set(dummyArray.newDocType.map(item => item.dosDate))];
      console.log(unique);
      dummyArray.newDocType = [];
      for (let index = 0; index < unique.length; index++) {
        dummyArray.newDocType.push({dosDate: unique[index]});
      }

      for (let newIndex = 0; newIndex < dummyArray.newDocType.length; newIndex++) {
        for (let index = 0; index < patientR.dosFrom.length; index++) {

          if (dummyArray.newDocType[newIndex].dosDate === patientR.dosFrom[index] + ' To ' + patientR.dosTo[index]) {
            newDoctypes.push(patientR.documentTypes[index]);
            newPageNumbers.push(patientR.pageNumber[index]);
          }
        }
        dummyArray.newDocType[newIndex].pageNumber = newPageNumbers;
        dummyArray.newDocType[newIndex].docType = newDoctypes; // .push({ dosFrom: patientR.dosFrom[newIndex], dosTo: patientR.dosTo[newIndex],docType: });
        newDoctypes = [];
        newPageNumbers = [];
      }

      console.log(dummyArray);
      return dummyArray;

      // i=this.model.length;
      // j++;
    }
  }
  // console.log(this.patientobj);
  // return this.patientobj;
}

getPatientsbyattorney() {
  let patientItem;
  console.log('currentuser is  ', this.currentuser.role);
  if (this.currentuser.role === 'admin' || this.currentuser.role === 'mdmuser') {
    console.log('user is either admin or mdmuser ', this.currentuser.role);
    return this.model;
  }
  console.log('user is either attorney or doctor ', this.currentuser.role);
  for (let i = 0; i < this.model.length; i++) {
    patientItem = this.model[i];
  //  if(patientItem.attorney!==[])

    for (let j = 0; j < patientItem.attorney.length; j++) {

    if (patientItem.attorney[j].username !== this.currentuser.username /*&& patientItem.attorney.password==*/) {
     patientItem.attorney.splice(j, 1);
     patientItem.dosFrom.splice(j, 1);
     patientItem.dosTo.splice(j, 1);
     patientItem.documentTypes.splice(j, 1);
     patientItem.pageNumber.splice(j, 1);
    }
  }
  if (patientItem.attorney ) {
  this.attorneypat[i] = patientItem;
  }
    }
    return this.attorneypat;
    }


  get(PatientId) {
    for (let i = 0; i < this.patients.length; i++) {
      const patientItem = this.patients[i];
    if (PatientId === patientItem.patientId) {
      return this.patients[i];
    }
  }
  }



  getattorneydos(PatientId) {
    const j = 0;
    for (let i = 0; i < this.attorneyDos.length; i++) {
      const patientr = this.attorneyDos[i];
    if (PatientId === patientr.patientItem) {
     // this.patient[j]=patientr;
     // i=this.attorneyDos.length;
     // j++;
      return this.attorneyDos[i];
    }
  }
 // console.log('getting attorneeydos ', this.patient);
 // return this.patient;
  }

 /* get(PatientId) {
    for (let i = 0; i < this.model.length; i++) {
      let patientr = this.model[i];
    if(PatientId === patientr.patientItem.patientId){
      return this.model[i];
    }
  }
  }*/

  setPratients(patients) {
    localStorage.patients = JSON.stringify(patients);
  }

  setDos(dos) {
    localStorage.attorneydos = JSON.stringify(dos);
  }

  setupdateddos(patients) {
    localStorage.model = JSON.stringify(this.model);
  }
  delete(id) {
    for (let i = 0; i < this.patients.length; i++) {
      const patient = this.patients[i];
      if (patient.patientId === id) {

          this.patients.splice(i, 1);
          localStorage.setItem('patients', JSON.stringify(this.patients));
          break;
      }
  }
  }
}
