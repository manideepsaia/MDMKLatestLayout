import { PracticeService } from './../practice.service';
import { AddPracticeComponent } from './../add-practice/add-practice.component';
import { Practice } from './../_models/practice';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogConfig} from '@angular/material';
import { EditPracticeComponent } from '../edit-practice/edit-practice.component';
import { Router } from '@angular/router';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // dataSource : MatTableDataSource<Practice>;
  dataSource ;
  practice;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Pre-defined columns list for user table
   */
  displayedColumns = ['id', 'PracticeName', 'Address', 'City', 'Tasks'];

  constructor(
    public dialog: MatDialog ,
    private practiceService: PracticeService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Practice>(this.practiceService.getPractices());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

      reinitializeData() {
       this.dataSource = new MatTableDataSource<Practice>(this.practiceService.getPractices());
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      }

      applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      openAddPracticeDialog(practice?) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.panelClass = 'addPracticeForm';
        dialogConfig.id = 'practiceForm';

        dialogConfig.data = practice;
        // dialogConfig.data={id: practice.id}

        const dialogRef = this.dialog.open(AddPracticeComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(response => this.reinitializeData());
      }

      deletePractice(id) {
        this.practiceService.delete(id);
        this.reinitializeData();
      }

}
