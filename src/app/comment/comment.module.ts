import { FormsModule } from '@angular/forms';
import { TaskerMaterialModule } from './../tasker-material.module';
import { CommentService } from './shared/comment.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

@NgModule({
  imports: [
    CommonModule,
    TaskerMaterialModule,
    FormsModule
  ],
  declarations: [CommentComponent,
    AddCommentComponent
],
  exports: [AddCommentComponent, CommentComponent],
  providers: [CommentService]
})
export class CommentModule { }
