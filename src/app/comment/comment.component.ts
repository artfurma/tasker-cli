import { CommentService } from './shared/comment.service';
import { CommentModel } from './shared/comment-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tskr-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  commentList: CommentModel[] = [];

  constructor(private commentService: CommentService) { }

}
