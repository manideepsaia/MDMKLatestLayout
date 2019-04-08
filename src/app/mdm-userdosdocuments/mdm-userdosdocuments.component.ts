import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { attorneydos } from '../_models/attorneydos';
import { DisplayPatientDocsComponent } from '../display-patient-docs/display-patient-docs.component';
import { AssigndostoattorneyComponent } from '../assigndostoattorney/assigndostoattorney.component';

@Component({
  selector: 'app-mdm-userdosdocuments',
  templateUrl: './mdm-userdosdocuments.component.html',
  styleUrls: ['./mdm-userdosdocuments.component.css']
})

export class MdmUserdosdocumentsComponent implements OnInit {

  dataSource;
  isDisabled = true;
  dateOfservice$;
  id;
  patientr;
  currentPatient = [];
  displayedColumns = ['patientId', 'Name', 'Age', 'gender', 'phone', 'Practice', 'doa', 'doctor'];

  doss: any;
  indexx: any;
  document: any;
  nwdata: any;
  ndata: attorneydos[] = [];
  attorneyDos: attorneydos[] = JSON.parse(localStorage.getItem('attorneydos')) || [];
  status: string;
  statusDate: Date;
  paymentDate: Date;
  arbNotes: string;
  natureOfDispute: string;
  attorney: any;
  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    public dialog: MatDialog,
  ) {
    //super();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('patient id is ', this.id)
    if (this.id) {
      this.patientr = this.patientService.getattorneydos(this.id) || [];
      this.currentPatient[0] = this.patientService.get(this.id);
      //.subscribe(o => this.patient = o);
      console.log('currentpatient and patient are ', this.patientr)

    }
  }
  ngOnInit() {
    if (localStorage.getItem('reloadCountDisplayDos') === '0') {
      window.location.reload();
      localStorage.setItem("reloadCountDisplayDos", '1');
    }

    this.dataSource = new MatTableDataSource(this.currentPatient);
    console.log(this.dataSource);
  }
  open(event: any) {
    event.preventDefault();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  Update() {

    console.log('starting update  previous data from local storage is ');
    console.log(this.patientr);
    console.log('starting update data from form is  ');
    console.log(this.nwdata);

    if(!this.nwdata){
      this.nwdata = this.patientr;
    }



    let newatorneydos;
    newatorneydos = this.nwdata.attorney[this.indexx];
    console.log('recent added attorney at ' + this.indexx + ' atorney is ', newatorneydos);
    if (!this.patientr.hasOwnProperty('attorney')) {
      // this.patientr.attorney=[];
      //this.patientr.attorney=newatorneydos;
      console.log('patient has no attorney property')
      this.patientr = this.nwdata;
    }
    else {
      //for(let i=0;i<this.ndata.length;i++){
      //this.patientr.attorney[this.indexx]=this.ndata[i].attorney[this.indexx];
      //}
      console.log(' previously added data', this.patientr)

      for (let i = 0; i < this.nwdata.attorney.length; i++) {
        if (this.nwdata.attorney[i] !== undefined || null) {

          this.patientr.attorney[i] = this.nwdata.attorney[i];
          this.patientr.status[i] = this.nwdata.status[i];
          this.patientr.statusDate[i] = this.nwdata.statusDate[i];
          this.patientr.natureOfDispute[i] = this.nwdata.natureOfDispute[i];
          this.patientr.arbNotes[i] = this.nwdata.arbNotes[i];
          this.patientr.paymentDate[i] = this.nwdata.paymentDate[i];
          /*  previousdata.attorney[i]=this.nwdata.attorney[i];
            previousdata.status[i]=this.nwdata.status[i];
            previousdata.statusDate[i]=this.nwdata.statusDate[i];
            previousdata.natureOfDispute[i]=this.nwdata.natureOfDispute[i];
            previousdata.arbNotes[i]=this.nwdata.arbNotes[i];
            previousdata.paymentDate[i]=this.nwdata.paymentDate[i];*/
        }/*else{
  this.patientr.attorney[i]=previousdata.attorney[i];
  this.patientr.status[i]=previousdata.status[i];
  
  this.patientr.statusDate[i]=previousdata.statusDate[i];
  this.patientr.natureOfDispute[i]=previousdata.natureOfDispute[i];
  this.patientr.arbNotes[i]=previousdata.arbNotes[i];
  this.patientr.paymentDate[i]=previousdata.paymentDate[i];

  }*/
      }
      //this.patientr.attorney[this.indexx]=this.nwdata.attorney[this.indexx];
      //this.patientr.status[this.indexx]=this.nwdata.status[this.indexx];
      //this.patientr.statusDate[this.indexx]=this.nwdata.statusDate[this.indexx];
      //this.patientr.natureOfDispute[this.indexx]=this.nwdata.natureOfDispute[this.indexx];
      //this.patientr.arbNotes[this.indexx]=this.nwdata.arbNotes[this.indexx];
      //this.patientr.paymentDate[this.indexx]=this.nwdata.paymentDate[this.indexx];

      //this.patientr=this.nwdata;
    }
    //this.patientr.attorney[this.indexx]=newatorneydos;
    console.log('previously added data plus new data from form ', this.patientr)
    this.patientService.updateattorneydos(this.patientr)
    //localStorage.getItem('attorneydos')
    //this.attorneyDos.push(newatorneydos);
    // localStorage.setItem('attorneydos', JSON.stringify(this.attorneyDos));
    // this.dataService.setData(this.nwdata);
     this.router.navigate(['/mdmuser/patients']);
  }
  openAssignAttorneyDialog(dos, index, patient, event: any) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();

    console.log('patientr is ', this.patientr)
    this.doss = dos;
    this.indexx = index;

    dialogConfig.panelClass = "assignAttorney";
    dialogConfig.id = "practiceForm";
    dialogConfig.data = { dos: this.doss, index: this.indexx, doc: patient, pdfSrc: this.document };
    const dialogRef = this.dialog.open(AssigndostoattorneyComponent, dialogConfig);
    dialogRef.componentInstance.onAdd.subscribe((data) => {
      this.nwdata = data;

      // this.ndata[this.indexx]=data;
      // console.log(this.ndata);
    });
    console.log(this.nwdata);
    // console.log(this.nwdata.attorney)
    // if(this.patientr.hasOwnProperty('attorney'))
    //this.patientr.attorney[this.indexx]=this.nwdata.attorney[this.indexx];
    //if(this.patientr.hasOwnProperty('attorney')){
    /*this.patientr.attorney[this.indexx]=this.nwdata.attorney[this.indexx];
   this.patientr.status[this.indexx]=this.nwdata.status[this.indexx];
   this.patientr.statusDate[this.indexx]=this.nwdata.statusDate[this.indexx];
   this.patientr.natureOfDispute[this.indexx]=this.nwdata.natureOfDispute[this.indexx];
   this.patientr.arbNotes[this.indexx]=this.nwdata.arbNotes[this.indexx];
   this.patientr.paymentDate[this.indexx]=this.nwdata.paymentDate[this.indexx];
   }
   */
  }
}

