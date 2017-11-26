import { CommentService } from './shared/comment.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommentComponent],
  providers: [CommentService]
})
export class CommentModule { }
