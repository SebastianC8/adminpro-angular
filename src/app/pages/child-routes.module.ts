import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaunoComponent } from './graficauno/graficauno.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { adminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
  { path: 'grafica1', component: GraficaunoComponent, data: { title: 'Chart one' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'User profile' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Search at all' } },

  // maintenance
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  { path: 'users', component: UsersComponent, canActivate: [adminGuard], data: { title: 'Users' } },

  // no route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
