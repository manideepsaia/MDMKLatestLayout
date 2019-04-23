import { first } from 'rxjs/operators';
import { AlertService } from './../_services/alert.service';
import { Practice } from './../_models/practice';
import { PracticeService } from './../practice.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Form, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-practice',
  templateUrl: './add-practice.component.html',
  styleUrls: ['./add-practice.component.css']
})
export class AddPracticeComponent implements OnInit {
  public addressForm: FormGroup;
  error: string;
  form: FormGroup;
  editData;
  changeTitle: boolean;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPracticeComponent>,
    private practiceService: PracticeService,
    private alertService: AlertService,
    private toastrManager: ToastrManager,
    @Inject(MAT_DIALOG_DATA) @Optional() data?: Practice
    ) {
      this.form = fb.group({
        id: new FormControl({disabled : true}),
        // id:['',Validators.required],
        // practiceName: new FormControl('',Validators.required),
        practiceName: ['', Validators.required],
        practiceCode: ['', Validators.required],
        address1 : new FormControl('', Validators.required),
        address2 : new FormControl('', Validators.nullValidator),
        city : new FormControl('', Validators.required),
        state : new FormControl('', Validators.required),
        zipcode : new FormControl('', Validators.required),
        practiceheader : new FormControl('', Validators.required),
        tinnum : new FormControl('', Validators.required),
      });
      if (data) {
        this.form.get('id').setValue(data.id);
        this.form.get('practiceName').setValue(data.practiceName);
        this.form.get('practiceCode').setValue(data.practiceCode);
        this.form.get('address1').setValue(data.address1);
        this.form.get('address2').setValue(data.address2);
        this.form.get('city').setValue(data.city);
        this.form.get('state').setValue(data.state);
        this.form.get('zipcode').setValue(data.zipcode);
        this.form.get('practiceheader').setValue(data.practiceheader);
        this.form.get('tinnum').setValue(data.tinnum);
        this.changeTitle = true;
      } else { this.changeTitle = false; }
    this.editData = data;
    }

  ngOnInit() {}
  zipcodeValidate(valueZip, eventVal) {
    console.log(eventVal);
    if (valueZip.length > 10) {
      this.form.get('zipcode').setValue(valueZip.substr(0, valueZip.length - 1));
    } else {
      if (valueZip.charCodeAt(valueZip.length - 1) >= 48 && valueZip.charCodeAt(valueZip.length - 1) <= 57) {
        if (valueZip.length === 5) {
          this.form.get('zipcode').setValue(valueZip + '-');
        }
      } else {
        this.form.get('zipcode').setValue(valueZip.substr(0, valueZip.length - 1));
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }



  get f() { return this.form.controls; }

  save() {
    if (!this.form.value.practiceName) {
           this.toastrManager.errorToastr('Practice name is required.', 'Field Missing!');
          return false;
         }
          if (!this.form.value.address1) {
            this.toastrManager.errorToastr('Address First Line is required.', 'Field Missing!');
            return false;
          }
          if (!this.form.value.city) {
            this.toastrManager.errorToastr('City is required.', 'Field Missing!');
            return false;
          }
          if (!this.form.value.state) {
            this.toastrManager.errorToastr('State is required.', 'Field Missing!');
            return false;
          }
          if (!this.form.value.zipcode) {
            this.toastrManager.errorToastr('Zincode is required.', 'Field Missing!');
            return false;
         }
         if (!this.form.value.zipcode) {
          this.toastrManager.errorToastr('Zincode is required.', 'Field Missing!');
          return false;
       }
        if (!this.form.value.practiceheader) {
        this.toastrManager.errorToastr('Practice Header is required.', 'Field Missing!');
        return false;
      }
      if (!this.form.value.tinnum) {
        this.toastrManager.errorToastr('Tin Number is required.', 'Field Missing!');
        return false;
     }

    this.submitted = true;

    // stop here if form is invalid
  //  if (this.form.invalid) {
   //   return;
   // }
    // this.dialogRef.close(this.form.value);
    // this.practiceService.create(this.form.value)
    //   .subscribe(
    //   data => {
    //       this.alertService.success('Changes made successful', true);
    //       this.dialogRef.close()
    //   },
    //   error => {
    //       this.alertService.error(error);
    //   });

      if (!this.editData) {
        this.changeTitle = false;
        // this.dialogRef.close(this.form.value);
        this.practiceService.create(this.form.value);
        this.dialogRef.close();
        this.toastrManager.successToastr('Add Practice succesfully.', 'Practice Added.');
      } else {
        this.changeTitle = true;
        this.practiceService.update(this.form.value);
        this.dialogRef.close();
        this.toastrManager.successToastr('Updated Practice succesfully.', 'Practice Updated.');
      }


  }
  close() {
    this.dialogRef.close();
  }

}
