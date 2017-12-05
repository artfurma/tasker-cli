import { TaskerMaterialModule } from './../tasker-material.module';
import { FormsModule } from '@angular/forms';
import { MilestoneService } from './shared/milestone.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestoneComponent } from './milestone.component';
import { MilestoneThumbnailComponent } from './milestone-thumbnail/milestone-thumbnail.component';
import { EvenOddPipe } from './shared/evenodd.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskerMaterialModule
  ],
  providers: [MilestoneService],
  declarations: [MilestoneComponent, MilestoneThumbnailComponent, EvenOddPipe],
  exports: [MilestoneComponent, MilestoneThumbnailComponent, EvenOddPipe]
})
export class MilestoneModule { }
