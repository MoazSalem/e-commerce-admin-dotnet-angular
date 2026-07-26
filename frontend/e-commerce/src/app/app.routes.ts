import { Routes } from '@angular/router';
import { AuthComponent } from '../features/auth/components/auth';
import { HomeComponent } from '../features/home/home';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    {
        path: 'home', component: HomeComponent
    }
];
