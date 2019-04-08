import { AttorneyComponent } from './attorney/attorney.component';
import { DoctorComponent } from './doctor/doctor.component';
import { MdmUserGuard } from './_guards/mdmuser.guard';
import { AdminGuard } from './_guards/admin.guard';
import { MdmUserdosdocumentsComponent } from './mdm-userdosdocuments/mdm-userdosdocuments.component';
import { MapDocumnetsComponent } from './map-documnets/map-documnets.component';
import { MdmUsereditpatientComponent } from './mdm-usereditpatient/mdm-usereditpatient.component';
import { MdmUserComponent } from './mdm-user/mdm-user.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { RoleGuard } from './_guards/role.guard';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AdminComponent } from './admin/admin.component';
import { MapDosComponent } from './map-dos/map-dos.component';
import { DisplayPatientDocsComponent } from './display-patient-docs/display-patient-docs.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register',component: RegisterComponent},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'mdmuser', component: MdmUserComponent, canActivate: [AuthGuard, MdmUserGuard], },
    { path: 'mdmuser/patients', component: MdmUsereditpatientComponent, canActivate: [AuthGuard, MdmUserGuard] },
    { path: 'mdmuser/mapDocuments', component: MapDocumnetsComponent, canActivate: [AuthGuard, MdmUserGuard]},
    { path: 'mdmuser/mapDocuments/:id', component: DisplayPatientDocsComponent, canActivate: [AuthGuard, MdmUserGuard] },
    { path: 'patient/documents/:id', component: MdmUserdosdocumentsComponent, canActivate: [AuthGuard] },
    { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
    { path: 'attorney', component: AttorneyComponent, canActivate: [AuthGuard] },
    { path: 'mdmuser/mapDos', component: MapDosComponent, canActivate: [AuthGuard, MdmUserGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
