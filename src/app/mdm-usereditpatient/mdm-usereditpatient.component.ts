import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../patient.service';
import { User } from '../_models';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';
import { Practice } from '../_models/practice';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-mdm-usereditpatient',
  templateUrl: './mdm-usereditpatient.component.html',
  styleUrls: ['./mdm-usereditpatient.component.css']
})
export class MdmUsereditpatientComponent implements OnInit {
// dataSource : MatTableDataSource<Practice>;
dataSource ;
practice;
currentUser: User;
// users: User[] = [];
patients = [];
newpractice: Practice[] = [];

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
/**
 * Pre-defined columns list for user table
 */
// displayedColumns = ['patientId','Name', 'Age', 'gender', 'phone', 'Practice', 'dob', 'doctor', 'attorney', 'Tasks'];
// displayedColumns = ['patientId','Name', 'doctor', 'attorney', 'Tasks'];
displayedColumns = ['patientId', 'Name', 'attorney', 'doctor', 'claimNo', 'policyNo', 'doa', 'Tasks'];
  data: any;

constructor(
  public dialog: MatDialog ,
  private patientService: PatientService,
  private router: Router,
  private dataService: DataService,
  ) {

    dataService.iData$.subscribe(data => this.data = data);
   }

ngOnInit() {

  this.dataSource = new MatTableDataSource(this.patientService.getPatients());
 // console.log(typeof this.dataSource);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.newpractice = JSON.parse(localStorage.getItem('practices'));
}

    reinitializeData() {
     this.dataSource = new MatTableDataSource(this.patientService.getPatients());
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openEditPatientDialog(patient?) {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.panelClass = 'editPatientForm';

      dialogConfig.data = patient;
      // dialogConfig.data = {id: this.practice.id};

     const dialogRef = this.dialog.open(EditPatientComponent, dialogConfig);
     dialogRef.afterClosed().subscribe(response => this.reinitializeData());
    }

    deletePatient(id) {
      this.patientService.delete(id);
      this.reinitializeData();
    }


}
