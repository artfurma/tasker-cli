import { MilestoneModule } from './../milestone/milestone.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskerMaterialModule } from './../tasker-material.module';
import { ProjectService } from './shared/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';

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
  declarations: [
    ProjectComponent
  ]
})
export class ProjectModule { }
