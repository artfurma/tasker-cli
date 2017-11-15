import { Routes, RouterModule } from '@angular/router';

import { TaskTreeComponent } from './task-tree/task-tree.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

import { TaskTreeResolverService } from './shared/task-tree-resolver.service';
import { TaskResolverService } from './shared/task-resolver.service';

export const taskRoutes: Routes = [
    // { path: 'tasks/new', component: CreateTaskComponent }, // TODO: Dodać , canDeactivate: ['canDeactivateCreateEvent']
    { path: 'tasks', component: TaskTreeComponent, resolve: { tasks: TaskTreeResolverService } },
    { path: 'tasks/:id', component: TaskDetailsComponent, resolve: { task: TaskResolverService } },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: '**', component: TaskTreeComponent }
];

export const taskRouting = RouterModule.forChild(taskRoutes);
