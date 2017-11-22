import { ReactiveFormsModule } from '@angular/forms';
import { TaskerMaterialModule } from './../tasker-material.module';
import { ProjectService } from './shared/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    CommonModule,
    TaskerMaterialModule,
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
