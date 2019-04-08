import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { User } from '../_models';
import { Practice } from '../_models/practice';

@Component({
  selector: 'app-attorney',
  templateUrl: './attorney.component.html',
  styleUrls: ['./attorney.component.css']
})
export class AttorneyComponent implements OnInit {
// dataSource : MatTableDataSource<Practice>;
dataSource ;
practice;
currentUser: User;
// users: User[] = [];
patients = [];
attorney = [];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
/**
 * Pre-defined columns list for user table
 */
// displayedColumns = ['patientId','Name', 'Age', 'gender', 'phone', 'Practice', 'dob', 'doctor', 'attorney', 'Tasks'];
displayedColumns = ['patientItem', 'Name', 'Practice', 'doctor', 'Tasks'];
newpractice: Practice[];
constructor(
  private patientService: PatientService,
  private router: Router) { }

ngOnInit() {
 console.log(this.patientService.getPatientsbyattorney());
//  this.dataSource = new MatTableDataSource(this.patientService.getPatientsbyattorney());
  this.dataSource = new MatTableDataSource(this.patientService.getPatients());
  // console.log(typeof this.dataSource);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

// Practice_DATA: Practice[] = [
//       {id: 1,practiceName: 'New Horizon Surgical Centre', address1: '1044', address2: 'New Avenue lane', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 2,practiceName: 'All City Family Health Care', address1: '3632', address2: 'Nostrand Ave', city:'Jersey City',state: 'New York',zipcode:56203},
//       {id: 3,practiceName: 'A&E Anesthesia Associates', address1: '2090', address2: 'Route 27 ste 103', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 4,practiceName: 'Manalappan Surgery Center', address1: '50', address2: 'Franklin Ln ste 101', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 5,practiceName: 'Ultimed Healthcare PC', address1: '50', address2: 'Franklin Ln ste 201', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 6,practiceName: 'Berlin Medical Associates', address1: '175', address2: 'Cross Keys rd ste 300A', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 7,practiceName: 'HMP Orthopedics', address1: '333', address2: 'East 56st', city:'New York', state: 'New York',zipcode:56203},
//       {id: 8,practiceName: 'Journal Square Surgical Center', address1: '550', address2: 'Newark Ave 5th floor ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 9,practiceName: 'Surgicore of Jersey City', address1: '550', address2: 'Newark Ave 5th floor ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 10,practiceName: 'Herschel Kotkes ', address1: '12', address2: 'Bayview Ave suite 12 ', city:'Lawrence', state: 'New York',zipcode:54023},
//       {id: 11,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 12,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 13,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 14,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 15,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 16,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 17,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 18,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 19,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 20,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 21,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//       {id: 22,practiceName: 'All City Family Health Care', address1: '1044', address2: 'New Avenue lane ', city:'Jersey City', state: 'New Jersy',zipcode:54023},
//     ];

    // dataSource = new MatTableDataSource<Practice>(this.Practice_DATA);
    // dataSource = new MatTableDataSource<Practice>(this.practiceService.getPractices());

    reinitializeData() {
    // this.dataSource = new MatTableDataSource(this.patientService.getPatients());
 //  this.dataSource = new MatTableDataSource(this.patientService.getPatientsbyattorney());
  console.log('in reinitialize data');
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
