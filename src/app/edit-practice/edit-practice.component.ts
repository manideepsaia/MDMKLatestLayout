import { HttpClient } from '@angular/common/http';
import { Practice } from './../_models/practice';
import { PracticeService } from './../practice.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Form, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-practice',
  templateUrl: './edit-practice.component.html',
  styleUrls: ['./edit-practice.component.css']
})
export class EditPracticeComponent implements OnInit {
  myTemplate: any = '';
  form: FormGroup;
  submitted = false;
  myExternalPageLink = 'https://mdmanage.sharepoint.com/nhsc/SitePages/Home.aspx';


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPracticeComponent>,
    private practiceService: PracticeService,

    // @Optional() @Inject(MAT_DIALOG_DATA) public data: Practice
  ) {


    // this.form =fb.group({
    //   practiceName: new FormControl('',Validators.required),
    //   address1 : new FormControl('',Validators.required),
    //   address2 :new FormControl('',Validators.nullValidator),
    //   city :new FormControl('',Validators.required),
    //   state :new FormControl('',Validators.required),
    //   zipcode :new FormControl('',Validators.required),
    // })

    // this.form.get('practiceName').setValue(data.practiceName);
    // this.form.get('address1').setValue(data.address1);
    // this.form.get('address2').setValue(data.address2);
    // this.form.get('city').setValue(data.city);
    // this.form.get('state').setValue(data.state);
    // this.form.get('zipcode').setValue(data.zipcode);
  }

  ngOnInit() {
    // var popup=window.open('https://mdmanage.sharepoint.com/nhsc/SitePages/Home.aspx','newwindow','width=1080,height=768');
    // popup.onload=function(){

    //   // window.close();
    // }


  }

  // get f() { return this.form.controls; }

  // save(){
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   //this.dialogRef.close(this.form.value);
  //   //this.practiceService.create(this.form.value);
  //   this.dialogRef.close()
  // }

  close() {
    this.dialogRef.close();
  }


}
