import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'tasks', loadChildren: 'app/task/task.module#TaskModule' }
];

export const routing = RouterModule.forRoot(appRoutes);
