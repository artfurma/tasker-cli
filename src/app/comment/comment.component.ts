import { CommentService } from './shared/comment.service';
import { CommentModel } from './shared/comment-model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TaskFiltersService } from '../task/shared/task-filters.service';
import { IControlPoint } from '../task/shared/task.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'milestoneFilters' })
export class MilestonesFiltersPipe implements PipeTransform {
  transform(allComments: CommentModel[]) {
   // return allComments.filter(milestone => this.isCommentInFilters(milestone));
  }
}


@Component({
  selector: 'tskr-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {


  commentList: CommentModel[] = [];
  MilestonesFilters: IControlPoint[] = [];
  constructor(private commentService: CommentService, private _taskFiltersService: TaskFiltersService) { }

  ngOnInit(): void {
    moment.locale('pl');
    this._taskFiltersService.SharedList2$.subscribe(lst => {
      this.MilestonesFilters = lst;
    });
  }



  isCommentInFilters(comment : CommentModel): boolean {
    if(this.MilestonesFilters.length===0)return true;
    console.log(comment);
    let ret: boolean = false;
    this.MilestonesFilters.forEach(element => {
      console.log(comment.milestone)
      if(comment.milestone!==null && element.id===comment.milestone.id){
        ret=true;
      }
    });
    return ret;
  }
}
