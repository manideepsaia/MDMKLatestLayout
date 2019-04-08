import { PatientService } from './../patient.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Practice } from '../_models/practice';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  form: FormGroup;
  editData;
  patients;
  submitted = false;
  newpractice: Practice;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPatientComponent>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) @Optional() data?) {
      this.form = fb.group({
        id: [{disabled : true}],
        practice: ['', Validators.required],
        doctor: ['', Validators.required],
        patientId: ['', Validators.required],
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        initial : ['', Validators.required],
        address : ['', [Validators.required]],
        city : ['', Validators.required],
        state : ['', Validators.required],
        zipcode : ['', Validators.required],
        homePhone : ['', Validators.required],
        gender : ['', Validators.required],
        firstVisit : ['', Validators.required],
        dob : ['', Validators.required],
        caseType : ['', Validators.required],
        workPhone : ['', Validators.required],
        age : ['', Validators.required],
        patientInsFirstName : ['', Validators.required],
        patientInsLastName : ['', Validators.required],
        patientInsInitial : ['', Validators.required],
        patientInsAddress : ['', Validators.required],
        patientInsCity : ['', Validators.required],
        patientInsState : ['', Validators.required],
        patientInsZipcode : ['', Validators.required],
        patientInsPhone : ['', Validators.required],
        pInsCompany : ['', Validators.required],
        pClaim : ['', Validators.required],
        doa : ['', Validators.required],
        pRelationship : ['', Validators.required],
        pNotes : ['', Validators.required],
        pPolicy : ['', Validators.required],
        sInsCompany : ['', Validators.required],
        sClaim : ['', Validators.required],
        sRelationship : ['', Validators.required],
        sNotes : ['', Validators.required],
        sPolicy : ['', Validators.required],
        attorneyFirstName : ['', Validators.required],
        attorneyLastName : ['', Validators.required],
        attorneyPhone : ['', Validators.required],
        attorneyfax : ['', Validators.required],
        attorneyAddress : ['', Validators.required],
        attorneyCity : ['', Validators.required],
        attorneyState : ['', Validators.required],
        attorneyZipcode : ['', Validators.required],
      });
      if (data) {
        this.form.get('id').setValue(data.id);
        this.form.get('practice').setValue(data.practice);
        this.form.get('doctor').setValue(data.doctor);
        this.form.get('patientId').setValue(data.patientId);
        this.form.get('firstName').setValue(data.firstName);
        this.form.get('lastName').setValue(data.lastName);
        this.form.get('initial').setValue(data.initial);
        this.form.get('address').setValue(data.address);
        this.form.get('city').setValue(data.city);
        this.form.get('state').setValue(data.state);
        this.form.get('zipcode').setValue(data.zipcode);
        this.form.get('homePhone').setValue(data.homePhone);
        this.form.get('gender').setValue(data.gender);
        this.form.get('firstVisit').setValue(data.firstVisit);
        this.form.get('dob').setValue(data.dob);
        this.form.get('caseType').setValue(data.caseType);
        this.form.get('workPhone').setValue(data.workPhone);
        this.form.get('age').setValue(data.age);
        this.form.get('patientInsFirstName').setValue(data.patientInsFirstName);
        this.form.get('patientInsLastName').setValue(data.patientInsLastName);
        this.form.get('patientInsInitial').setValue(data.patientInsInitial);
        this.form.get('patientInsAddress').setValue(data.patientInsAddress);
        this.form.get('patientInsCity').setValue(data.patientInsCity);
        this.form.get('patientInsState').setValue(data.patientInsState);
        this.form.get('patientInsZipcode').setValue(data.patientInsZipcode);
        this.form.get('patientInsPhone').setValue(data.patientInsPhone);
        this.form.get('pInsCompany').setValue(data.pInsCompany);
        this.form.get('pClaim').setValue(data.pClaim);
        this.form.get('doa').setValue(data.doa);
        this.form.get('pRelationship').setValue(data.pRelationship);
        this.form.get('pNotes').setValue(data.pNotes);
        this.form.get('pPolicy').setValue(data.pPolicy);
        this.form.get('sInsCompany').setValue(data.sInsCompany);
        this.form.get('sClaim').setValue(data.sClaim);
        this.form.get('sRelationship').setValue(data.sRelationship);
        this.form.get('sNotes').setValue(data.sNotes);
        this.form.get('sPolicy').setValue(data.sPolicy);
        this.form.get('attorneyFirstName').setValue(data.attorneyFirstName);
        this.form.get('attorneyLastName').setValue(data.attorneyLastName);
        this.form.get('attorneyPhone').setValue(data.attorneyPhone);
        this.form.get('attorneyfax').setValue(data.attorneyfax);
        this.form.get('attorneyAddress').setValue(data.attorneyAddress);
        this.form.get('attorneyCity').setValue(data.attorneyCity);
        this.form.get('attorneyState').setValue(data.attorneyState);
        this.form.get('attorneyZipcode').setValue(data.attorneyZipcode);
      }
      this.editData = data;
      this.patients = this.patientService.getPatients();
  }

  ngOnInit() {
    this.newpractice = JSON.parse(localStorage.getItem('practices'));
  }

  get f() { return this.form.controls; }

  save() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.patientService.update(this.form.value);
        this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
