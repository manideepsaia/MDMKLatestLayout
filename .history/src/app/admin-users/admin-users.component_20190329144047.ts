import { AddUserComponent } from './../add-user/add-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../_models';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
// dataSource : MatTableDataSource<Practice>;
dataSource ;
practice;
currentUser: User;
users: User[] = [];

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
/**
 * Pre-defined columns list for user table
 */
displayedColumns = ['id', 'Name', 'Email', 'Practice', 'Role', 'Tasks'];

constructor(
  public dialog: MatDialog ,
  private userService: UserService,
  private router: Router) { }

ngOnInit() {

  this.dataSource = new MatTableDataSource<User>(this.userService.getAll());
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
     this.dataSource = new MatTableDataSource<User>(this.userService.getAll());
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddUserDialog(user?) {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.panelClass = 'addUserForm';

      dialogConfig.data = user;
      // dialogConfig.data={id: practice.id}

      const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(response => this.reinitializeData());
    }

    deletePractice(id) {
      console.log('in user delete ');
      this.userService.delete(id);
      this.reinitializeData();
    }


}
