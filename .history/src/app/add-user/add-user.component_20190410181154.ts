import { User } from './../_models/user';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService, AlertService } from '../_services';
import { PracticeService } from '../practice.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  error: string;
  form: FormGroup;
  editData;
  changeTitle: boolean;
  practices;
  disAbled = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private alertService: AlertService,
    private toastrManager: ToastrManager,
    private practiceService: PracticeService,

    @Inject(MAT_DIALOG_DATA) @Optional() data?: User
    ) {
      this.form = fb.group({
        id: [{disabled : true}],
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        username : ['', Validators.required],
        password : ['', [Validators.required, Validators.minLength(3)]],
        practice : ['', Validators.required],
        role : ['', Validators.required],
      });
      if (data) {
        this.form.get('id').setValue(data.id);
        this.form.get('firstName').setValue(data.firstName);
        this.form.get('lastName').setValue(data.lastName);
        this.form.get('username').setValue(data.username);
        this.form.get('password').setValue(data.password);
        this.form.get('practice').setValue(data.practice);
        this.form.get('role').setValue(data.role);
        this.changeTitle = true;
      } else { this.changeTitle = false; }
    this.editData = data;
    this.practices = this.practiceService.getPractices();
    }

  ngOnInit() {
   // this.practices=this.practiceService.getPractices();
  }

  get f() { return this.form.controls; }

  save() {
    // console.log(this.form.value);
    if (!this.form.value.firstName) {
      this.toastrManager.errorToastr('First Name Required', 'Missing Required Field!');
      return false;
    }
    if (!this.form.value.lastName) {
      this.toastrManager.errorToastr('Last Name Required', 'Missing Required Field!');
      return false;
    }
    if (!this.form.value.username) {
      this.toastrManager.errorToastr('Username Required', 'Missing Required Field!');
      return false;
    }
    if (!this.form.value.password) {
      this.toastrManager.errorToastr('Password Required', 'Missing Required Field!');
      return false;
    }
    if (!this.form.value.role) {
      this.toastrManager.errorToastr('Role Required', 'Missing Required Field!');
      return false;
    }
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

      if (!this.editData) {
        // this.dialogRef.close(this.form.value);
        this.userService.create(this.form.value);
        this.dialogRef.close();
        this.toastrManager.successToastr('Added User Successfully.', 'User Create.');
      } else {
        this.userService.update(this.form.value);
        this.dialogRef.close();
        this.toastrManager.successToastr('Updated User Successfully.', 'User Update.');
      }
  }

  onRoleChange(value) {
    if (value === 'doctor') {
      console.log( this.disAbled);
      this.disAbled = true;
      console.log(this.disAbled);
    } else {
      this.disAbled = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

}
