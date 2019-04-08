import { Component, OnInit, Inject, Optional, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { PatientService } from '../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT, formatDate } from '@angular/common';
import { first, isEmpty } from 'rxjs/operators';
import { AlertService } from './../_services/alert.service';
import { Practice } from './../_models/practice';
import { PracticeService } from './../practice.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Form, Validators, FormGroup, FormControl, RequiredValidator } from '@angular/forms';
import { doc } from '../_models/doc';
import { attorneydos } from '../_models/attorneydos';
import { User } from '../_models';

@Component({
  selector: 'app-assigndostoattorney',
  templateUrl: './assigndostoattorney.component.html',
  styleUrls: ['./assigndostoattorney.component.css']
})
export class AssigndostoattorneyComponent implements OnInit {
  dos;
  user: any[] = []
  form: FormGroup;
  pdata: any;
  index: number;
  pdfSrc;
  filename: string;
  onAdd = new EventEmitter();
  // status: string[]=[];
  status: string;
  statusDate: Array<Date> = [];;
  attorney: any;
  // attorney:User[]=[];
  // paymentDate: Date[]=[];
  paymentDate: Array<Date> = [];;
  arbNotes: string[] = [];
  natureOfDispute: string[] = [];
  attdos: attorneydos;
  saveDisabled: boolean;
  constructor(
    private nwdata: attorneydos,
    // @Inject(DOCUMENT) private document: any,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssigndostoattorneyComponent>,
    //private practiceService : PracticeService,
    // private alertService :AlertService,
    @Inject(MAT_DIALOG_DATA) @Optional() data?: any,
  ) {
    this.form = fb.group({
      dos: ['', Validators.required],
      attorney: ['', Validators.required],
      statusDate: ['', Validators.required],
      status: ['', Validators.required],
      paymentDate: ['', Validators.required],
      arbNotes: ['', Validators.required],
      natureOfDispute: ['', Validators.required],
    })

    //console.log(data);
    // attorneyDos:attorneydos[] =JSON.parse(localStorage.getItem('attorneydos')) || [];
    this.attdos = this.patientService.getattorneydos(data.doc.patientItem) || [];
    this.dos = data.dos;
    this.pdata = data;
    this.index = data.index
    this.user = this.patientService.getUser('attorney');
    console.log(this.user);
    console.log(this.attdos);
    //this.status=this.patientr.status;
    // this.statusDate=this.patientr.statusDate; 
    //  this.attorney=this.patientr.attorney[data.index];
    //  console.log('attorney is '+ this.patientr.attorney[data.index])
    //  this.paymentDate=this.patientr.paymentDate;
    //  this.arbNotes=this.patientr.arbNotes;
    //  this.natureOfDispute=this.patientr.natureOfDispute;
    //if(data.doc.attorney){


    // this.status=data.doc.status;
    // this.statusDate=data.doc.statusDate; 


    // console.log(this.attdos.attorney);
    // if(this.attdos.attorney){

    // this.attorneyobj=data.doc.attorney[data.index];
    // this.attorney=data.doc.attorney[data.index];
    //  this.saveDisabled=true;
    // console.log(this.attdos.attorney);
    //  }
    //   else {
    // this.attorneyobj={};
    //  this.attorney={};
    //    this.saveDisabled=false;
    // }
    //if(data.hasOwnProperty('attorney'))
    if (data.doc.hasOwnProperty('attorney')/* && data.doc.attorney[this.index]*/) {
      console.log('has property attorney')
      console.log('index is ', this.index)
      let formvalue;
      formvalue = this.form.value;

      // this.status[this.pdata.index]=data.doc.status[this.pdata.index];
      this.status = data.doc.status[this.pdata.index];




      // this.statusDate[this.pdata.index]=data.doc.statusDate[this.pdata.index] ; 
      this.statusDate = data.doc.statusDate[this.pdata.index];
      //this.statusDate[this.pdata.index]=formvalue.statusDate ; 
      this.paymentDate = data.doc.paymentDate[this.pdata.index];
      //this.paymentDate[this.pdata.index] =formvalue.paymentDate ;
      this.arbNotes[this.pdata.index] = data.doc.arbNotes[this.pdata.index];
      this.natureOfDispute[this.pdata.index] = data.doc.natureOfDispute[this.pdata.index];
      this.attorney = data.doc.attorney[this.pdata.index];
      console.log('attorney is ', this.attorney)
        this.saveDisabled = false;
      console.log(this.paymentDate)
      console.log(this.statusDate)
    }
    //console.log(this.attdos.hasOwnProperty('attorney'))
    console.log('attorney is');
    console.log(this.attorney);

    console.log('index is');
    console.log(this.index);
    console.log('data is');
    console.log(data);
    //  this.paymentDate=data.doc.paymentDate;
    //  this.arbNotes=data.doc.arbNotes;
    //  this.natureOfDispute=data.doc.natureOfDispute;
    //}
  }

  ngOnInit() {
    // if(!this.pdata)
    // this.pdata={};
  }
  compareFn(user1: User, user2: User) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }
  handleFileInput(event: any) {
    event.preventDefault();
    console.log('in handle file input');
    // this.pdfSrc=this.pdata.pdfSrc;  
  }

  save() {
    console.log('in save before dos mapping ', this.pdata.doc, this.nwdata);
    let formvalue = this.form.value;
    console.log(formvalue);
    this.nwdata.natureOfDispute[this.pdata.index] = formvalue.natureOfDispute;
    this.nwdata.arbNotes[this.pdata.index] = formvalue.arbNotes;
    this.nwdata.paymentDate[this.pdata.index] = formvalue.paymentDate;
    this.nwdata.statusDate[this.pdata.index] = formvalue.statusDate;
    this.nwdata.status[this.pdata.index] = formvalue.status;
    this.nwdata.patientItem = this.pdata.doc.patientItem;
    this.nwdata.practice = this.pdata.doc.practice;
    this.nwdata.dosFrom = this.pdata.doc.dosFrom;
    this.nwdata.dosTo = this.pdata.doc.dosTo;
    this.nwdata.pageNumber = this.pdata.doc.pageNumber;
    this.nwdata.documentTypes = this.pdata.doc.documentTypes;
    // this.nwdata.dosNewFrom=this.pdata.doc.dosNewFrom;
    // this.nwdata.dosNewTo=this.pdata.doc.dosNewTo;
    this.nwdata.newDocType = this.pdata.doc.newDocType;
    this.nwdata.doctor = this.pdata.doc.doctor;
    this.nwdata.attorney[this.pdata.index] = (this.form.get('attorney').value);
    //  console.log('data, nwdata after dos mapping ', this.pdata.doc, this.nwdata);     
    this.onAdd.emit(this.nwdata);

    this.dialogRef.close();
  }
  // update(){
  // this.patientService.updatedos(this.nwdata)
  //}
  close() {
    this.dialogRef.close();
  }
}
