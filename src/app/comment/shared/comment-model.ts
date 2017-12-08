import { IControlPoint } from "../../task/shared/task.model";

export class CommentModel {
    id: number;
    date: Date;
    content: string;
    user: string;
    milestone: IControlPoint;
}
