import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { doc } from '../_models/doc';
import { AssigndostoattorneyComponent } from '../assigndostoattorney/assigndostoattorney.component';
import { DataService } from '../_services/data.service';
import { attorneydos } from '../_models/attorneydos';
@Component({
  selector: 'app-display-patient-docs',
  templateUrl: './display-patient-docs.component.html',
  styleUrls: ['./display-patient-docs.component.css']
})
export class DisplayPatientDocsComponent implements OnInit {
  id: string;
  // patientr: doc[]=[];
  patientr;
  doss: any;
  indexx: any;
  document: any;
  dataSource;
  nwdata: any;
   attorneyDos: attorneydos[] = JSON.parse(localStorage.getItem('attorneydos')) || [];
   currentPatient = [];
   // storagemodel :doc[] =JSON.parse(localStorage.getItem('model')) || [];
   displayedColumns = ['patientId', 'Name', 'Age', 'gender', 'phone', 'Practice', 'doa', 'doctor'];

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog ,
    private dataService: DataService,

  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id is ', this.id);

    if (this.id) {
     // let patient;
    this.patientr = this.patientService.getPatientByIdfrdis(this.id);
    console.log('patienr frm service ', this.patientr);
    // this.patientr=patient;
     // this.patientr = this.patientService.getattorneydos(this.id);
      this.currentPatient[0] = this.patientService.get(this.id);
        }
       // window.location.reload();

  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('wait for the option to select'));
  }
  ngOnInit() {
   // console.log('in display', this.document);
 //  this.patientService.openAssignAttorneyDialog(dos: any, index: any, patient: any, event: any);
 this.dataSource = new MatTableDataSource(this.currentPatient);

 if (localStorage.getItem('reloadCount') === '0') {
   window.location.reload();
   localStorage.setItem('reloadCount', '1');
 }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  Update() {
    localStorage.setItem('reloadCountDisplayDos', '0');
let newatorneydos;
if (this.nwdata) {
  console.log('update ', this.nwdata);
newatorneydos = this.nwdata;
} else {
  console.log('update is null so attorneydos=patient ', this.patientr);
  console.log('index is ', this.indexx);
  newatorneydos = this.patientr;

}
this.attorneyDos.push(newatorneydos);
    localStorage.setItem('attorneydos', JSON.stringify(this.attorneyDos));
    this.dataService.setData(this.nwdata);
    this.router.navigate(['/mdmuser/patients']);
   }
   open(event: any) {
    event.preventDefault();
   }
  openAssignAttorneyDialog(dos, index, patient, event: any) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
   this.doss = dos;
   this.indexx = index;
   dialogConfig.panelClass = 'assignAttorney';
   dialogConfig.id = 'practiceForm';
   dialogConfig.data = {dos: this.doss, index: this.indexx, doc: patient,  pdfSrc: this.document};
   const dialogRef = this.dialog.open(AssigndostoattorneyComponent, dialogConfig);
    dialogRef.componentInstance.onAdd.subscribe((data) => {
    this.nwdata = data;
  });

   }


}










/*import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { doc } from '../_models/doc';
import { AssigndostoattorneyComponent } from '../assigndostoattorney/assigndostoattorney.component';
import { DataService } from '../_services/data.service';
import { attorneydos } from '../_models/attorneydos';
@Component({
  selector: 'app-display-patient-docs',
  templateUrl: './display-patient-docs.component.html',
  styleUrls: ['./display-patient-docs.component.css']
})
export class DisplayPatientDocsComponent implements OnInit {
  id: string;
  //patientr: doc[]=[];
  patientr;
  doss: any;
  indexx: any;
  document: any;
  dataSource;
  nwdata: any;
   attorneyDos:attorneydos[] =JSON.parse(localStorage.getItem('attorneydos')) || [];
   currentPatient=[];
   //storagemodel :doc[] =JSON.parse(localStorage.getItem('model')) || [];
   displayedColumns = ['patientId','Name', 'Age', 'gender', 'phone', 'Practice', 'doa', 'doctor'];

  constructor(
    private patientService : PatientService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog:MatDialog ,
    private dataService:DataService,

  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id is ',this.id)

    if (this.id) {
     // let patient;
    this.patientr = this.patientService.getPatientByIdfrdis(this.id);
    // this.patientr=patient;
     // this.patientr = this.patientService.getattorneydos(this.id);
      this.currentPatient[0] =this.patientService.get(this.id);
        }
       // window.location.reload();

  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("wait for the option to select"));
  }
  ngOnInit() {
   // console.log('in display', this.document);
 //  this.patientService.openAssignAttorneyDialog(dos: any, index: any, patient: any, event: any);
 this.dataSource = new MatTableDataSource(this.currentPatient);

 if(localStorage.getItem('reloadCount')==='0'){
   window.location.reload();
   localStorage.setItem("reloadCount",'1');
 }
  }

  Update(){
    localStorage.setItem("reloadCountDisplayDos", '0');
let newatorneydos;
if(this.nwdata){
  console.log('update ', this.nwdata);
newatorneydos=this.nwdata;
}
else{
  console.log('update is null so attorneydos=patient ', this.patientr);
  console.log('index is ', this.indexx);
  newatorneydos=this.patientr[0];

}
this.attorneyDos.push(newatorneydos);
    localStorage.setItem('attorneydos', JSON.stringify(this.attorneyDos));
    this.dataService.setData(this.nwdata);
    this.router.navigate(['/mdmuser/patients']);
   }
  openAssignAttorneyDialog(dos, index, patient, event:any){
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
   this.doss=dos;
   this.indexx=index;
   dialogConfig.panelClass="assignAttorney";
   dialogConfig.id="practiceForm";
   dialogConfig.data={dos:this.doss, index:this.indexx, doc:patient,  pdfSrc:this.document};
   const dialogRef = this.dialog.open(AssigndostoattorneyComponent, dialogConfig);
    dialogRef.componentInstance.onAdd.subscribe((data) => {
    this.nwdata=data;
  });

   }


}
*/
