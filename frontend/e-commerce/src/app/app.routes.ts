import { Routes } from '@angular/router';
import { AuthComponent } from '../features/auth/components/auth';
import { HomeComponent } from '../features/home/home';
import { guestGuard } from '../core/guards/guest-guard';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: AuthComponent, canActivate: [guestGuard] },
    {
        path: 'home', component: HomeComponent, canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'home' // Let the guards figure out where they actually belong
    }
];
