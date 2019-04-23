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
displayedColumns = ['id', 'Name', 'Email', 'Role', 'Tasks'];

constructor(
  public dialog: MatDialog ,
  private userService: UserService,
  private router: Router) { }

ngOnInit() {

  this.dataSource = new MatTableDataSource<User>(this.userService.getAll());
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

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
