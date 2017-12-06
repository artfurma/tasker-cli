import { TaskerMaterialModule } from './../tasker-material.module';
import { FormsModule } from '@angular/forms';
import { MilestoneService } from './shared/milestone.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestoneComponent } from './milestone.component';
import { MilestoneThumbnailComponent } from './milestone-thumbnail/milestone-thumbnail.component';
import { MilestoneAddComponent } from './milestone-add/milestone-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskerMaterialModule
  ],
  providers: [MilestoneService],
  declarations: [MilestoneComponent, MilestoneThumbnailComponent, MilestoneAddComponent],
  exports: [MilestoneComponent, MilestoneThumbnailComponent, MilestoneAddComponent],
  entryComponents: [
    MilestoneAddComponent
  ]
})
export class MilestoneModule { }
