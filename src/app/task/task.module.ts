import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskerMaterialModule } from '../tasker-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskThumbnailComponent } from './task-thumbnail/task-thumbnail.component';
import { TaskTreeComponent } from './task-tree/task-tree.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskMainComponent } from './task-main/task-main.component';

import { TaskTreeResolverService } from './shared/task-tree-resolver.service';
import { TaskResolverService } from './shared/task-resolver.service';
import { TaskService } from './shared/task.service';

import { taskRouting } from './task.routing';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    keyboardControl: true
  };
  


@NgModule({
    imports: [
        CommonModule,
        TaskerMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        taskRouting,
        SwiperModule.forRoot(SWIPER_CONFIG)
    ],
    declarations: [
        TaskTreeComponent,
        TaskThumbnailComponent,
        TaskDetailsComponent,
        TaskMainComponent
    ],
    providers: [
        TaskTreeResolverService,
        TaskResolverService,
        TaskService
    ],
})
export class TaskModule { }
