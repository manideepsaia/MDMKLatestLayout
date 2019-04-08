import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Practice } from '../_models/practice';
import { User } from '../_models';
import { UserService } from '../_services';
import { doc } from '../_models/doc';
import { dos } from '../_models/dos';
import { AssigndostoattorneyComponent } from '../assigndostoattorney/assigndostoattorney.component';
import { ToastrManager} from 'ng6-toastr-notifications';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-map-dos',
  templateUrl: './map-dos.component.html',
  styleUrls: ['./map-dos.component.css']
})
export class MapDosComponent implements OnInit {

  //dos;
  form:FormGroup;
  id;
  isdisabled=true;
  searchValue;
  searchBy;
  patientnew=[];
  patient:doc[]=[];
  currentPatient=[];
  dosfromI: any;
  dostoI: any;
  newpractice: Practice[];
  isCollapsed=false;
  patients:any;
  patientItem:any[];
  users:User[]=[];
  user:User[]=[];
  nwdata:dos;  
  attorney:any[]=[];
  doctor: any[]=[];
  fdoctor:any[]=[];
  doss: any;
  indexx: any;
  displayedColumns = ['patientid','Practice', 'doctype', 'dos',  'Tasks'];
  document: any;
  dataSource: any;
  constructor(
    
    private fb:FormBuilder,
    private patientService : PatientService,
    private router: Router, 
    private route: ActivatedRoute,
    public dialog:MatDialog ,
    private toastrManager:ToastrManager
  ) { 
    this.form =fb.group({
      practice : ['',Validators.required],
      searchBy :['',Validators.required],
      searchValue :['',[Validators.required]],
      patientr :['',Validators.required],
      dob :['',Validators.required],
      doa :['',Validators.required],
      dosFrom:['',Validators.required],
      dosTo:['', Validators.required],
      patient:['', Validators.required],
      status:['', Validators.required],
      attorney:['', Validators.required],
      doctorItem:['', Validators.required],
  
    })

    
  }
 
 go(){
 
let inputDate: Date;
this.searchValue=this.form.get('searchValue').value;
this.searchBy=this.form.get('searchBy').value;
console.log(this.searchValue);
console.log(this.searchBy);

if(this.searchBy='patientID')
{
  this.patient[0]=null;
this.patient = this.patientService.getPatientById(this.searchValue);
if(!this.patient[0]){
  console.log('in patient is empty')
  this.toastrManager.errorToastr("add dos to patient/ no dos found for this pat.","dos missing.")
  return false;
}
}
else if(this.searchBy='firstName')
this.patient = this.patientService.getByPatientFirstName(this.searchValue);
else
this.patient = this.patientService.getByPatientLastName(this.searchValue);

this.patient[0].dosFrom;
console.log("pateintobj array is");

console.log(this.patient);

 //this.currentPatient[0] =this.patientService.get(this.searchValue);
 this.isdisabled=false;

//console.log(this.user);
//console.log(this.attorney);

  }
 
  ngOnInit() {
 
  this.newpractice= JSON.parse(localStorage.practices);
  this.users=JSON.parse(localStorage.getItem('users'));
  this.document=JSON.parse(localStorage.getItem('model'));
  this.dataSource = new MatTableDataSource<doc>(this.document);
 
}

openAssignAttorneyDialog(dos, index, patient){
 const dialogConfig = new MatDialogConfig();
this.doss=dos;
this.indexx=index;
dialogConfig.panelClass="assignAttorney";
dialogConfig.id="practiceForm";
//console.log('dos is ',dos)
//console.log('index is ',index)
dialogConfig.data={dos:this.doss, index:this.indexx, doc:patient};
const dialogRef = this.dialog.open(AssigndostoattorneyComponent, dialogConfig)

}
}
