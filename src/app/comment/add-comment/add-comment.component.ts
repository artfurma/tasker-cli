import { CommentModel } from './../shared/comment-model';
import { CommentService } from './../shared/comment.service';
import { CommentAdd } from './../shared/comment-add';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'tskr-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {

  commentToAdd: CommentAdd;
  comment: CommentModel;
  constructor(private commentService: CommentService,
    public dialogRef: MatDialogRef<AddCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.commentToAdd = new CommentAdd();
    }

    addComment() {
      this.commentToAdd.Date = new Date();
      this.commentToAdd.MilestoneID = null;
      this.commentToAdd.UserId = JSON.parse(localStorage.getItem('currentUser')).id;
      this.commentToAdd.TaskId = +this.data.taskId;

      this.commentService.addTaskComment(this.commentToAdd)
                            .subscribe(res => {
                                        this.comment = res;
                                        this.dialogRef.close(this.comment); });

    }
    no() {
      this.dialogRef.close();
    }
}
