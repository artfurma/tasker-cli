import { ProjectComponent } from './project/project.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { TaskDetailsComponent } from './task/task-details/task-details.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'tasks', loadChildren: 'app/task/task.module#TaskModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'project/:id', component: ProjectComponent },
    { path: 'register', component: RegisterComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
