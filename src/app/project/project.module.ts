import { MilestoneModule } from './../milestone/milestone.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskerMaterialModule } from './../tasker-material.module';
import { ProjectService } from './shared/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectAddComponent } from './project-add/project-add.component';

@NgModule({
  imports: [
    CommonModule,
    MilestoneModule,
    TaskerMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProjectService
  ],
  exports: [
    ProjectAddComponent
  ],
  declarations: [
    ProjectComponent,
    ProjectAddComponent
]
})
export class ProjectModule { }
