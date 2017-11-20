import { User } from "../../users/user/user";

export interface Task {
    id: number;
    name: string;
    description: string;
    children?: Task[];
    statusId: TaskStatus;
    title: string;
    mainPerformer: number;
    taskPerformers: User[];
    controlPointIds: IControlPointIds[];
}
export interface IControlPointIds{
    ID: number;
    EndDate: Date;
    Name : string;
}

export interface IControlPoint{
    id: number;
    EndDate: Date;
    Name : string;
}

export enum TaskStatus{
    "Not started"= 1,
    "In progress"= 2,
    "Done"=3
}