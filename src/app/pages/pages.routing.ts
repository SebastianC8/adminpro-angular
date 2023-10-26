// Módulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Rutas
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaunoComponent } from './graficauno/graficauno.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'grafica1', component: GraficaunoComponent, data: { title: 'Chart one' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'User profile' } },

            // maintenance
            { path: 'users', component: UsersComponent, data: { title: 'Users' } },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },

            // no route
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ],
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
