import { CommentModel } from './../shared/comment-model';
import { CommentService } from './../shared/comment.service';
import { CommentAdd } from './../shared/comment-add';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { IControlPoint } from '../../task/shared/task.model';
import { UsersFiltersService } from '../../task/shared/users-filters.service';

@Component({
  selector: 'tskr-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {

  commentToAdd: CommentAdd;
  comment: CommentModel;
  allMilestones: IControlPoint[];
  chosedMilestone: IControlPoint;

  constructor(private commentService: CommentService,
    public dialogRef: MatDialogRef<AddCommentComponent>,
    private milestoneService: UsersFiltersService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.commentToAdd = new CommentAdd();
    this.chosedMilestone = null;
    this.allMilestones = this.milestoneService.getMilestones();
  }

  addComment() {
    this.commentToAdd.Date = new Date();
    this.commentToAdd.MilestoneID = this.chosedMilestone === undefined ? null : this.chosedMilestone.id;
    this.commentToAdd.UserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.commentToAdd.TaskId = +this.data.taskId;
    this.commentService.addTaskComment(this.commentToAdd)
      .subscribe(res => {
        this.comment = res;
        this.dialogRef.close(this.comment);
      });

  }
  no() {
    this.dialogRef.close();
  }
}
