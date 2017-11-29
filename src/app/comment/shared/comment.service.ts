import { CommentAdd } from './comment-add';
import { CommentModel } from './comment-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentService {

    private getCommentsURL = '/api/comment/';
    private addCommentUrl = '/api/comment';

    constructor(private http: HttpClient) { }

    public getTaskComments(taskId: number) {
        return this.http.get<CommentModel[]>(this.getCommentsURL + taskId);
    }

    public addTaskComment(commentAdd: CommentAdd) {
        return this.http.post<CommentModel>(this.addCommentUrl, commentAdd);
    }

}
