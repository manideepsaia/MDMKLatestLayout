import { PatientService } from './../patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Practice } from '../_models/practice';
import { Route, Router } from '@angular/router';
import { ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-mdm-user',
  templateUrl: './mdm-user.component.html',
  styleUrls: ['./mdm-user.component.css']
})
export class MdmUserComponent implements OnInit {
form: FormGroup;
  newpractice: Practice;
  filename: string;
  formD: FormData;
  pdfSrc;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private toastrManager: ToastrManager
  ) {
    this.form = fb.group({
      id: [{disabled : true}],
      practice: ['', Validators.required],
      doctor: ['', Validators.required],
      patientId: ['', Validators.required],
      firstName : ['', Validators.required],
      // lastName : ['', Validators.required],
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
      pCertifier : ['', Validators.required],
      pAdjuster : ['', Validators.required],
      pAdjusterfax : ['', Validators.required],
      doa : ['', Validators.required],
      pRelationship : ['', Validators.required],
      pNotes : ['', Validators.required],
      pPolicy : ['', Validators.required],
      sInsCompany : ['', Validators.required],
      sClaim : ['', Validators.required],
      sCertifier : ['', Validators.required],
      sAdjuster : ['', Validators.required],
      sAdjusterfax : ['', Validators.required],
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
     }

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

    attorneyzipCodeValidate(valueZip, eventVal) {
      console.log(eventVal);
      if (valueZip.length > 10) {
        this.form.get('attorneyZipcode').setValue(valueZip.substr(0, valueZip.length - 1));
      } else {
        if (valueZip.charCodeAt(valueZip.length - 1) >= 48 && valueZip.charCodeAt(valueZip.length - 1) <= 57) {
          if (valueZip.length === 5) {
            this.form.get('attorneyZipcode').setValue(valueZip + '-');
          }
        } else {
          this.form.get('attorneyZipcode').setValue(valueZip.substr(0, valueZip.length - 1));
        }
      }
    }

    patientInsZipcode(valueZip, eventVal) {
      console.log(eventVal);
      if (valueZip.length > 10) {
        this.form.get('patientInsZipcode').setValue(valueZip.substr(0, valueZip.length - 1));
      } else {
        if (valueZip.charCodeAt(valueZip.length - 1) >= 48 && valueZip.charCodeAt(valueZip.length - 1) <= 57) {
          if (valueZip.length === 5) {
            this.form.get('patientInsZipcode').setValue(valueZip + '-');
          }
        } else {
          this.form.get('patientInsZipcode').setValue(valueZip.substr(0, valueZip.length - 1));
        }
      }
    }

     onFileSelected() {
      const $pdf: any = document.querySelector('#file');
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result;
        };
        reader.readAsArrayBuffer($pdf.files[0]);
      }
    }
     handleFileInput(files: FileList) {
      const formData = new FormData();
      this.filename = '/mapDocuments/' + files[0].name;
      formData.append('Document', files[0], files[0].name);
      this.formD = formData;
      console.log(this.formD.get('Document'));
      this.onFileSelected();
  }
  ngOnInit() {
    this.newpractice = JSON.parse(localStorage.getItem('practices'));
  }

  // change(value:any){
// console.log('value is ',value)
 // }

  save() {

    if (!this.form.value.practice) {
            this.toastrManager.errorToastr('Practice Field is missing.', 'Missing Required Field.');
            return false;
      }
          console.log(this.formD);
          if (!this.formD) {
            this.toastrManager.errorToastr('Upload the file please', 'No File Uplaoded.');
            return false;
          }
          if (!this.form.value.patientId) {
            this.toastrManager.errorToastr('Patient ID Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.firstName) {
            this.toastrManager.errorToastr('First Name Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.lastName) {
           this.toastrManager.errorToastr('Last Name Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.initial) {
            this.toastrManager.errorToastr('Initial Field is missing.', 'Missing Required Field.');
            return false;
          }
         if (!this.form.value.address) {
           this.toastrManager.errorToastr('Address Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.city) {
            this.toastrManager.errorToastr('City Field is missing.', 'Missing Required Field.');
            return false;
        }
          if (!this.form.value.state) {
           this.toastrManager.errorToastr('State Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.zipcode) {
            this.toastrManager.errorToastr('ZipCode Field is missing.', 'Missing Required Field.');
            return false;
        }
          if (!this.form.value.gender) {
            this.toastrManager.errorToastr('Gender Field is missing.', 'Missing Required Field.');
            return false;
          }
        if (!this.form.value.firstVisit) {
            this.toastrManager.errorToastr('First Visit Field is missing.', 'Missing Required Field.');
            return false;
          }
         if (!this.form.value.dob) {
            this.toastrManager.errorToastr('Date Od Birth Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.caseType) {
            this.toastrManager.errorToastr('Case Type Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.age) {
            this.toastrManager.errorToastr('Age Field is missing.', 'Missing Required Field.');
          return false;
        }
          if (!this.form.value.homePhone) {
            this.toastrManager.errorToastr('Home Phone Number Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.workPhone) {
          this.toastrManager.errorToastr('Phone Number at Work Place Field is missing.', 'Missing Required Field.');
            return false;
          }
         if (!this.form.value.patientInsFirstName) {
          this.toastrManager.errorToastr('Patient Insurance First Name Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.patientInsLastName) {
            this.toastrManager.errorToastr('Patient Insurance Last Name Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.patientInsInitial) {
           this.toastrManager.errorToastr('Patient Insurance Initial Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.patientInsAddress) {
            this.toastrManager.errorToastr('Patient Insurance Address Field is missing.', 'Missing Required Field.');
           return false;
       }
          if (!this.form.value.patientInsCity) {
            this.toastrManager.errorToastr('Patient Insurance City Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.patientInsState) {
            this.toastrManager.errorToastr('Patient Insurance State Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.patientInsZipcode) {
            this.toastrManager.errorToastr('Patient Insurance ZipCode Field is missing.', 'Missing Required Field.');
          return false;
          }
          if (!this.form.value.patientInsPhone) {
            this.toastrManager.errorToastr('Patient Insurance Phone Number Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.patientInsPhone) {
          this.toastrManager.errorToastr('Patient Insurance Phone Number Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.pInsCompany) {
           this.toastrManager.errorToastr('Patient Insurance Company Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.pClaim) {
            this.toastrManager.errorToastr('Patient Insurance Claim Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.doa) {
            this.toastrManager.errorToastr('Patient Insurance DOA Field is missing.', 'Missing Required Field.');
           return false;
         }
          if (!this.form.value.pRelationship) {
            this.toastrManager.errorToastr('Patient Insurance Nominee Relationship Field is missing.', 'Missing Required Field.');
            return false;
         }
         if (!this.form.value.pNotes) {
            this.toastrManager.errorToastr('Patient Insurance Notes  Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.pPolicy) {
            this.toastrManager.errorToastr('Patient Insurance Policy Number  Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.sInsCompany) {
            this.toastrManager.errorToastr('Patient Insurance Secondary Company  Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.sClaim) {
            this.toastrManager.errorToastr('Patient Insurance Secondary Claim  Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.sRelationship) {
            this.toastrManager.errorToastr('Patient Insurance Secondary Nominee Relationship  Field is missing.', 'Missing Required Field.');
            return false;
          }
         if (!this.form.value.sNotes) {
          this.toastrManager.errorToastr('Patient Insurance Secondary Notes  Field is missing.', 'Missing Required Field.');
           return false;
         }
         if (!this.form.value.sPolicy) {
           this.toastrManager.errorToastr('Patient Insurance Secondary Policy Number Field is missing.', 'Missing Required Field.');
            return false;
          }
         if (!this.form.value.attorneyFirstName) {
            this.toastrManager.errorToastr('Attorney FirstName Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.attorneyLastName) {
            this.toastrManager.errorToastr('Attorney LastName Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.attorneyPhone) {
            this.toastrManager.errorToastr('Attorney Phone Number Field is missing.', 'Missing Required Field.');
          return false;
         }
         if (!this.form.value.attorneyfax) {
           this.toastrManager.errorToastr('Attorney FAX Number Field is missing.', 'Missing Required Field.');
           return false;
          }
          if (!this.form.value.attorneyAddress) {
            this.toastrManager.errorToastr('Attorney Address Field is missing.', 'Missing Required Field.');
            return false;
          }
         if (!this.form.value.attorneyCity) {
           this.toastrManager.errorToastr('Attorney City Field is missing.', 'Missing Required Field.');
            return false;
        }
         if (!this.form.value.attorneyState) {
            this.toastrManager.errorToastr('Attorney State Field is missing.', 'Missing Required Field.');
            return false;
          }
          if (!this.form.value.attorneyZipcode) {
           this.toastrManager.errorToastr('Attorney ZIPCode Field is missing.', 'Missing Required Field.');
           return false;
         }
    if (confirm('Do you want to save patient information')) {
      this.patientService.create(this.form.value);
      this.router.navigate(['/mdmuser/patients']);
        console.log(this.form.value);
        this.form.reset();
      }
 // this.patientService.create(this.form.value);
 // console.log(this.form.value);
 // this.form.reset();
  }

}
