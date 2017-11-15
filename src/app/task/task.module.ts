import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskerMaterialModule } from '../tasker-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskThumbnailComponent } from './task-thumbnail/task-thumbnail.component';
import { TaskTreeComponent } from './task-tree/task-tree.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

import { TaskTreeResolverService } from './shared/task-tree-resolver.service';
import { TaskResolverService } from './shared/task-resolver.service';
import { TaskService } from './shared/task.service';

import { taskRouting } from './task.routing';

@NgModule({
    imports: [
        CommonModule,
        TaskerMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        taskRouting
    ],
    declarations: [
        TaskTreeComponent,
        TaskThumbnailComponent,
        TaskDetailsComponent
    ],
    providers: [
        TaskTreeResolverService,
        TaskResolverService,
        TaskService
    ],
})
export class TaskModule { }
