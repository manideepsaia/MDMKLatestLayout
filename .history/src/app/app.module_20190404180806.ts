import { PracticeService } from './practice.service';
import { PatientService } from './patient.service';
import { MdmUserGuard } from './_guards/mdmuser.guard';
import { AdminGuard } from './_guards/admin.guard';
import { RoleGuard } from './_guards/role.guard';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatToolbarModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldControl, MAT_DATE_LOCALE, MatSlideToggleModule, MatListModule, MatExpansionModule , MatSidenavModule} from '@angular/material';
import { AddPracticeComponent } from './add-practice/add-practice.component';
import { EditPracticeComponent } from './edit-practice/edit-practice.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MdmUserComponent } from './mdm-user/mdm-user.component' ;
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MdmUsereditpatientComponent } from './mdm-usereditpatient/mdm-usereditpatient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { MapDocumnetsComponent } from './map-documnets/map-documnets.component';
import { MdmUserdosdocumentsComponent } from './mdm-userdosdocuments/mdm-userdosdocuments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AttorneyComponent } from './attorney/attorney.component';
import { doc } from './_models/doc';
import { MapDosComponent } from './map-dos/map-dos.component';
import { mapDosToAttorney } from './_models/mapDosToAttorney';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AssigndostoattorneyComponent } from './assigndostoattorney/assigndostoattorney.component';
import { ToastrModule } from 'ng6-toastr-notifications';;
import { DisplayPatientDocsComponent } from './display-patient-docs/display-patient-docs.component'
import { DataService } from './_services/data.service';
import { attorneydos } from './_models/attorneydos';
@NgModule({
    imports: [
        BrowserModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        routing,
        LayoutModule,
        MatSidenavModule,
        NgbModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatListModule,
        MatExpansionModule,
        PdfViewerModule,
        CommonModule,
        LayoutModule,
        MatSidenavModule
        
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AdminComponent,
        DashboardComponent,
        NavbarComponent,
        AddPracticeComponent ,
        EditPracticeComponent ,
        AdminUsersComponent ,
        AddUserComponent ,
        MdmUserComponent ,
        MdmUsereditpatientComponent ,
        EditPatientComponent ,
        MapDocumnetsComponent ,
        MdmUserdosdocumentsComponent ,
        DoctorComponent,
        MapDosComponent,
        AttorneyComponent ,
        MainNavComponent ,
        AssigndostoattorneyComponent,
        DisplayPatientDocsComponent,
       
      ],
    providers: [
        AuthGuard,
        RoleGuard,
        doc,
        attorneydos,
        AdminGuard,
        MdmUserGuard,
        AlertService,
        AuthenticationService,
        UserService,
        PatientService,
        PracticeService,
        DataService,
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents:[
        AddPracticeComponent,
        EditPracticeComponent,
        AddUserComponent,
        EditPatientComponent,
        AssigndostoattorneyComponent
    ]
})

export class AppModule { }