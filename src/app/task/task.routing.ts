import { Routes, RouterModule } from '@angular/router';

import { TaskTreeComponent } from './task-tree/task-tree.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

import { TaskTreeResolverService } from './shared/task-tree-resolver.service';
import { TaskResolverService } from './shared/task-resolver.service';
import { TaskMainComponent } from './task-main/task-main.component';
import { TaskNewComponent } from './task-new/task-new.component';
import { TaskEditComponent } from './task-edit/task-edit.component';


export const taskRoutes: Routes = [
  // { path: 'tasks/new', component: CreateTaskComponent }, // TODO: Dodać , canDeactivate: ['canDeactivateCreateEvent']
  // { path: 'tasks', component: TaskTreeComponent, resolve: { tasks: TaskTreeResolverService } },
  // { path: 'tasks/:id', component: TaskDetailsComponent, resolve: { task: TaskResolverService } },
  // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // { path: '**', component: TaskTreeComponent }
  {
    path: '', component: TaskMainComponent,
    children: [
      { path: '', component: TaskTreeComponent,
      // resolve: { tasks: TaskTreeResolverService } 
      }
    ]
  },
  //   {
  //     path: 'new', component: TaskTreeComponent,
  //     children: [
  //       {
  //         path: '',
  //         component: DragonsListComponent,
  //         resolve: { list: DragonsListResolveService }
  //       },
  //       {
  //         path: '',
  //         component: DragonsDetailsComponent,
  //         outlet: 'details'
  //       }
  //     ]
  //   },

  {
    path: 'new', component: TaskMainComponent,
    children: [
      {
        path: '',
        component: TaskTreeComponent,
        //resolve: { tasks: TaskTreeResolverService }
      },
      {
        path: '',
        component: TaskNewComponent,
        outlet: 'new',
        //resolve: { details: TaskResolverService }
        // canDeactivate: [ CanDeactivateFormGuardService ]
      }
    ]
  },
  {
    path: 'new/:id', component: TaskMainComponent,
    children: [
      {
        path: '',
        component: TaskTreeComponent,
        //resolve: { tasks: TaskTreeResolverService }
      },
      {
        path: '',
        component: TaskNewComponent,
        outlet: 'new',
        //resolve: { details: TaskResolverService }
        // canDeactivate: [ CanDeactivateFormGuardService ]
      }
    ]
  },
  {
    path: 'edit/:id', component: TaskMainComponent,
    children: [
      {
        path: '',
        component: TaskTreeComponent,
        //resolve: { tasks: TaskTreeResolverService }
      },
      {
        path: '',
        component: TaskEditComponent,
        outlet: 'edit',
        //resolve: { details: TaskResolverService }
        // canDeactivate: [ CanDeactivateFormGuardService ]
      }
    ]
  },  
  {
    path: ':id', component: TaskMainComponent,
    children: [
      {
        path: '',
        component: TaskTreeComponent,
        //resolve: { tasks: TaskTreeResolverService }
      },
      {
        path: '',
        component: TaskDetailsComponent,
        outlet: 'details',
        
        //resolve: { details: TaskResolverService }
        // canDeactivate: [ CanDeactivateFormGuardService ]
      }
    ]
  },

];

export const taskRouting = RouterModule.forChild(taskRoutes);
