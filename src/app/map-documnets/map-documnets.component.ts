import { MapDocumentsService } from './../map-documents.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { MatOption, MatDialog, MatSelect } from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { DOCUMENT, formatDate } from '@angular/common';
import { EditPracticeComponent } from '../edit-practice/edit-practice.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { doc } from '../_models/doc';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ArrayDataSource, DataSource } from '@angular/cdk/collections';
import { isEmpty } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';
import { PatientService } from '../patient.service';
import { Practice } from '../_models/practice';
import { forEach } from '@angular/router/src/utils/collection';
import { stringify } from '@angular/core/src/util';
import { User } from '../_models';
import { PracticeService } from '../practice.service';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-map-documnets',
  templateUrl: './map-documnets.component.html',
  styleUrls: ['./map-documnets.component.css']
})
export class MapDocumnetsComponent implements OnInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  @ViewChild('mySelect') mySelect;
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild("matdivider") matdivider :ElementRef;
  documentTypes:string;
  index:number;
  practice:string;
  dosFrom:Date;
  dosTo:Date;
  searchBy:string;
  patients=[];
  patient=[];
  //storagemodel:doc[]=[];
  storagemodel :doc[] =JSON.parse(localStorage.getItem('model')) || [];
  searchValue:string;
  patientItem:string;
  //doa:Date;
  disabled:boolean=false;
 // dob:Date;
  updatedDoa: any;
  updatedDob: any;
  addAndUpdate:boolean=true;
  pageNumber:any=[];
  form:FormGroup;
  formD : FormData;
  pageId;
  fileToUpload: File = null;
  pdfSrc;
  isActive: boolean;
  opened:boolean;
  fileSrc;
  page=1;
  pdf: any;
  isLoaded = false;
  outline: any[];
  totalPages : number;
  remainingPdfPages ;
  selectPageNo;
  filename;
  sticky: boolean = false;
  stickyButton: boolean = false;
  elementPosition: any;
  patientArray:doc[]=[];
  mapAddDoc :any[]=[];
  temp :any[]=[];
  dataSource=null;
  addDisabled:boolean=true;
  displayedColumns = ['Document Type','Practice Id', 'doctor', 'Patient Id','DOS From - DOS To', 'Pages','Actions'];
  newdosFrom: any;
  newdosTo: any;
  mapDetails: any;
  doct:any[]=[];
  newpractice: Practice[];
  checkIfOthersAreSelected;
  remainingPdfPagess;
  doctor: any;
  deletedisabled: boolean=false;
  user:User[]=[];
  pastindex: any;
  editdisabled: boolean=false;
  selectedpatients=[];
  openedfilter: boolean;
  formdoc: any;
  
  constructor(
   private fb:FormBuilder,
   @Inject(DOCUMENT) private document: any,
   public dialog:MatDialog ,
   private mapDocService : MapDocumentsService,
   private  http:HttpClient,
   private model:doc,
   private alertService: AlertService,
   private patientService : PatientService,
   private practiceService : PracticeService,
   private router: Router, 
  ) { 
   
  }
  
  ngOnInit() {
   // this.storagemodel =JSON.parse(localStorage.getItem('model')) || [];
    this.patients= JSON.parse(localStorage.patients);
    this.newpractice= JSON.parse(localStorage.practices);
    this.user=this.patientService.getUser('doctor');
    console.log('doctors are ',this.user);
    this.form =this.fb.group({
      documentTypes: ['', Validators.required],
      practice : ['', Validators.required],
      dosFrom: ['', Validators.required],
      dosTo: ['', Validators.required],
      searchBy: ['', Validators.required],
      searchValue: ['', Validators.required],
      patientItem: ['', Validators.required],
    //  dob: ['', Validators.required],
    //  doa: ['', Validators.required],
      pageNumber: ['', Validators.required],
      doctor: ['', Validators.required],
    });
  }

 // ngAfterViewInit(){
  //  this.elementPosition = this.menuElement.nativeElement.offsetTop;
  //  console.log(' element pos is ',this.elementPosition)
 // }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      this.elementPosition=this.matdivider.nativeElement.offsetTop;
      if(windowScroll >= this.elementPosition ){
        this.sticky = true;
        this.stickyButton=true;
      } else {
        this.sticky = false;
        this.stickyButton=false;
      }
    }

    handleFileInput(files: FileList){
      console.log(' trget ', files[0].name)
      const formData = new FormData();
      this.filename = '/mapDocuments/' + files[0].name;
      formData.append('Document', files[0], files[0].name);
      this.formD= formData;
      this.formdoc=this.formD;
      console.log(this.formD.get('Document'));
      this.onFileSelected();
  }

  reinitializeData(mappedData){
    console.log('reinitialize data', mappedData);
  this.dataSource = new MatTableDataSource<doc>(mappedData);
 

   }

   dosFormatDate(dosFrom:Date, dosTo:Date){
    this.newdosFrom=formatDate(dosFrom, 'MMddyyyy', 'en-us');
    this.newdosTo=formatDate(dosTo, 'MMddyyyy', 'en-us');
      }

  /*genericFormat_Date(dob:Date, doa:Date){
    this.updatedDoa=formatDate(dob, 'MMddyyyy', 'en-us');
    this.updatedDoa=formatDate(doa, 'MMddyyyy', 'en-us');
  }*/

  onFileSelected() {
    const $pdf: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      console.log('pdfsrc ',this.pdfSrc)
      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }
 
 
 applyFilter(){
 console.log('in apply filter');
   this.patient=this.Filteredpatients(); 
   console.log('filtered patient is ',this.patient);
 }

 Filteredpatients() {
  console.log('in filteredpatients')
  let selectedPractice=this.form.value.practice;
  console.log('in filter selected practice is ', selectedPractice)
 this.selectedpatients= this.patientService.getPatientsByPractice(selectedPractice.practiceName);
   if(this.searchBy=='patientId')
   return this.selectedpatients.filter(item=> item.patientId.indexOf(this.searchValue)!==-1);
   else if(this.searchBy=='firstName')
   return this.selectedpatients.filter(item=> item.firstName.indexOf(this.searchValue)!==-1);
   else
   return this.selectedpatients.filter(item=> item.lastName.indexOf(this.searchValue)!==-1);
 }
 openedChangefilter(openedfilter:boolean){
  if(openedfilter===true && this.patient){
    console.log('in opened filter');
    this.openedfilter=openedfilter;
  }
return true;
}

add(){
    //if (this.form.invalid) {
   //   return;
 // }
 this.deletedisabled=false;
  let formvalue =this.form.value;
  //this.model.practice=formvalue.practice;
  this.model.practice=formvalue.practice.practiceName;
  this.model.documentTypes.push(formvalue.documentTypes);
  this.dosFormatDate(formvalue.dosFrom, formvalue.dosTo);
  this.model.dosFrom.push(this.newdosFrom);
  this.model.dosTo.push(this.newdosTo);
  this.model.searchBy=formvalue.searchBy;
  this.model.searchValue=formvalue.searchValue;
  //this.model.patientItem=formvalue.patientItem;
  this.model.patientItem=formvalue.patientItem.patientId;
//this.model.patientItem=formvalue.patientItem;
  //this.model.doctor=formvalue.doctor;
  this.model.doctor=formvalue.doctor.firstName;
 //this.model.doctor=formvalue.doctor.firstName;
 // this.genericFormat_Date(formvalue.doa, formvalue.dob);
  //this.model.doa=this.updatedDoa
 // this.model.dob=this.updatedDob;
  let page_number=((formvalue.pageNumber).join(','));
  this.model.pageNumber.push(page_number);
  console.log('adding data by click add');
  console.log('model '+JSON.stringify(this.model));
 this.mapAddDoc.push({ "documentTypes":formvalue.documentTypes,"dosFrom": formvalue.dosFrom, "dosTo": formvalue.dosTo, "pageNumber": page_number, "practice":formvalue.practice.practiceName, "doctor": formvalue.doctor.firstName, "searchBy": formvalue.searchBy, "searchValue": formvalue.searchValue,"patientItem": formvalue.patientItem });
  this.reinitializeData(this.mapAddDoc);
  for(let i=0;i<this.pageNumber.length;i++){
    let j=this.pageNumber[i];
    this.remainingPdfPages[j-1]=null;
  }
 this.disabled=true;
     this.delay(500).then(any=>{    
       this.form.get('documentTypes').reset();
     //  this.form.get('dosFrom').reset();
      // this.form.get('dosTo').reset();
       this.form.get('pageNumber').reset();
 
     });
      console.log('resetted doctypes, dos, pagenumber');  
}
  
save(){    
    console.log('in save');
    this.deletedisabled=false;
    let formvalue =JSON.stringify(this.model);
    this.formD.append('FormValue', formvalue);
    this.formD.append('File', this.formD.get('Document'));
    console.log("IN Save...Document is: . :",this.formD.get("Document"));
    console.log("IN Save... FormValues are : ",formvalue);
    let newmodel=(this.model);
    let id=this.model.patientItem;
   this.storagemodel.push(newmodel);
   console.log('data array is ',this.storagemodel);
   //this.storagemodel.push(this.model);
    localStorage.setItem('model', JSON.stringify(this.storagemodel));
    console.log('patientId is ',this.model.patientItem);
    let lcstrge=JSON.parse(localStorage.getItem('model'));
    console.log(' data from local storage is '+lcstrge);
    this.mapDocService.create(this.formD);
   console.log('sent data to Create method of mapdocservice');
    //console.log('commented api call line');
    let map=new Map<Date, String[]>();
      for(let i=0;i<this.model.dosFrom.length;i++){
        for(let j=i+1; j<this.model.dosFrom.length;j++){
          if(this.model.dosFrom[i]===this.model.dosFrom[j]){
           
           this.doct.push(this.model.documentTypes[j-1])
           
               //  map.set(this.model.dosFrom[i],)
          }
          else{
            this.doct.push(this.model.documentTypes[j-i])
                    i=j-1;
                    j=this.model.dosFrom.length-1;
          }
        }
        map.set(this.model.dosFrom[i],this.doct);
      }
      console.log(map)
      this.delay(500).then(any=>{
        this.form.get('documentTypes').reset();
        this.form.get('practice').reset();
        this.form.get('dosFrom').reset();
        this.form.get('dosTo').reset();
        this.form.get('searchBy').reset();
        this.form.get('searchValue').reset();
        this.form.get('patientItem').reset();
        this.form.get('doctor').reset();
      //  this.form.get('dob').reset();
      //  this.form.get('doa').reset();
        this.form.get('pageNumber').reset();
    });
    localStorage.setItem("reloadCount", '0');
    this.delay(2500).then(any=>{
       this.router.navigate(['/mdmuser/mapDocuments', id])
        
      });

    this.formD.delete('FormValue');
  this.model.documentTypes=[];
  this.model.dosFrom=[];
  this.model.dosTo=[];
  this.model.pageNumber=[];
  this.model.practice=null;
  this.model.searchBy='';
  this.model.patientItem=''
  this.model.searchValue='';
  this.model.doctor=null;
  //this.model=null;
  //this.model.doa=null;
  //this.model.dob=null;
  this.remainingPdfPages=[];
  this.remainingPdfPages=new Array(this.totalPages);
  this.dataSource=null;
  this.mapAddDoc=[];
 
    }
  incrementPage(amount: number) {
    this.page += amount;
  }

  showCurrentPage(amount: number){
    this.page= amount;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("wait for the option to select"));
  }


  selectPage(amount:number){
    this.selectPageNo = amount.toString();
    console.log('page no. are '+this.selectPageNo);
    this.mySelect.open();
  }

  selectPageNext(){
    this.selectPageNo = this.page.toString();
    this.mySelect.open();
    this.delay(2000).then(any=>{
    this.incrementPage(1);
  })
  }

  openedChange(opened:boolean){
    if(opened === true && this.selectPageNo){
      document.getElementById(this.selectPageNo).click();
      console.log('page no. are '+this.selectPageNo);
      this.selectPageNo = '';
      this.opened=opened;
      this.delay(1000).then(any=>{
        this.mySelect.close();
   });
    }
    return true;
  }

  unSelectAll(){
    this.form.controls.pageNumber.patchValue([]);
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;
    this.totalPages = pdf.numPages;
    this.remainingPdfPages = new Array(pdf.numPages);
    this.loadOutline();
  }

  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  toggleChange(value:any){
    console.log('Value is ',value);
  }
  editMapDoc(mapDetails,index, value:any){
    console.log('in editmapdoc value', value);
    this.deletedisabled=true;
    this.addAndUpdate=false;
    //this.addAndUpdatepage=true;
    this.mapDetails=mapDetails;
    this.isActive=true;
    this.index=index;
    this.pastindex=index;
    this.documentTypes = mapDetails.documentTypes;
    this.dosFrom = mapDetails.dosFrom;
    this.dosTo = mapDetails.dosTo;  
    if(typeof mapDetails.pageNumber=='string'){
      let page_number=((mapDetails.pageNumber).split(','));
      this.pageNumber=page_number;
    }
    else{
         let page_number=mapDetails.pageNumber;
          this.pageNumber=page_number;
    }
  
  for(let i=0;i<this.pageNumber.length;i++){
      let j=this.pageNumber[i];
      if(this.remainingPdfPages[j-1]==null){
        this.remainingPdfPages[j-1]=this.pageNumber[i];
      }
    }
  this.editdisabled=true;
 // this.index=null;
    //let j=this.index;
  }
  Cancel(){
    this.isActive=false;
    this.editdisabled=false;
    this.addAndUpdate=true;
    this.deletedisabled=false;
    this.documentTypes =this.mapDetails.documentTypes;
    this.dosFrom =this.mapDetails.dosFrom;
    this.dosTo = this.mapDetails.dosTo;
    if(typeof this.mapDetails.pageNumber=='string'){
      let page_number=((this.mapDetails.pageNumber).split(','));
      this.pageNumber=page_number;
    }
    else{
         let page_number=this.mapDetails.pageNumber;
          this.pageNumber=page_number;
    }
    for(let i=0;i<this.remainingPdfPages.length;i++){
      let j=this.pageNumber[i];
      this.remainingPdfPages[j-1]=null;
    }
    
    this.delay(500).then(any=>{    
      // this.form.get('practice').reset();
       this.form.get('documentTypes').reset();
       this.form.get('dosFrom').reset();
       this.form.get('dosTo').reset();
       this.form.get('pageNumber').reset();
      });
  
  }
  updateMapDoc(){
    console.log('in update ')
    this.editdisabled=false;
    this.deletedisabled=false;
    this.isActive=false;
    //this.temp.push({ "documentTypes":this.documentTypes,"dosFrom": this.dosFrom, "dosTo": this.dosTo, "pageNumber": this.pageNumber, "practice":this.practice, "doctor":this.doctor, "searchBy": this.searchBy, "searchValue": this.searchValue,"patientItem": this.patientItem, "doa": this.doa, "dob":this.dob } );
    let formvalue=this.form.value;
    this.temp.push({ "documentTypes":this.documentTypes,"dosFrom": this.dosFrom, "dosTo": this.dosTo, "pageNumber": this.pageNumber, "practice":formvalue.practice.practiceName, "doctor":formvalue.doctor.firstName, "searchBy": this.searchBy, "searchValue": this.searchValue,"patientItem": this.patientItem } );
    this.mapAddDoc[this.index]=this.temp[0];
    this.temp=[];
    this.reinitializeData(this.mapAddDoc);
    this.addAndUpdate=true;
    this.model.documentTypes[this.index]=this.documentTypes;
    this.dosFormatDate(this.dosFrom, this.dosTo);
    this.model.dosFrom[this.index]=this.newdosFrom;
    this.model.dosTo[this.index]=this.newdosTo;
    this.model.pageNumber[this.index]=this.pageNumber.join(',');
    console.log('after update data is ');
    console.log(this.model);
    for(let i=0;i<this.remainingPdfPages.length;i++){
      let j=this.pageNumber[i];
      this.remainingPdfPages[j-1]=null;
    }
    this.delay(500).then(any=>{    
   // this.form.get('practice').reset();
    this.form.get('documentTypes').reset();
    this.form.get('dosFrom').reset();
    this.form.get('dosTo').reset();
    this.form.get('pageNumber').reset();
   });
  }

  deleteMapDoc(mapDetails,index){
    this.addAndUpdate=true;
   let page_no:any;
   page_no=(this.model.pageNumber[index]);
   let pageno=page_no.split(',');
    for(let i=0;i<pageno.length;i++){
      let j=pageno[i];
      if(this.remainingPdfPages[j-1]==null){
        this.remainingPdfPages[j-1]=page_no[i];
      }
    }
    this.mapAddDoc.splice(index, 1);
    this.reinitializeData(this.mapAddDoc);
    this.model.documentTypes.splice(index, 1);
    this.model.dosFrom.splice(index, 1);
    this.model.dosTo.splice(index, 1);
    this.model.pageNumber.splice(index, 1);
    console.log('after delete data is');
    console.log(this.model);
    this.delay(500).then(any=>{    
   // this.form.get('practice').reset();
    this.form.get('documentTypes').reset();
    this.form.get('dosFrom').reset();
    this.form.get('dosTo').reset();
    this.form.get('pageNumber').reset();
  });
  if(this.mapAddDoc.length==0){
     
    this.delay(500).then(any=>{ 
    this.form.get('searchBy').reset();
    this.form.get('searchValue').reset();
    this.form.get('patientItem').reset();
   // this.form.get('dob').reset();
   // this.form.get('doa').reset();
    });
    this.dataSource=null; 
     this.mapAddDoc=[];
  }   
  }
}
    