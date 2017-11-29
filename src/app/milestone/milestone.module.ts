import { TaskerMaterialModule } from './../tasker-material.module';
import { FormsModule } from '@angular/forms';
import { MilestoneService } from './shared/milestone.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestoneComponent } from './milestone.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskerMaterialModule
  ],
  providers: [MilestoneService],
  declarations: [MilestoneComponent],
  exports: [MilestoneComponent]
})
export class MilestoneModule { }
