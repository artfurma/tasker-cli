import { Routes, RouterModule,CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthGuard } from "./auth/guard/auth.guard";

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'tasks', loadChildren: 'app/task/task.module#TaskModule',canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
