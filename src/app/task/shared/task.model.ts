import { User } from "../../users/user/user";

export interface Task {
    id: number;
    parentTaskId:number;
    name: string;
    description: string;
    children?: Task[];
    statusId: TaskStatus;
    title: string;
    mainPerformer: number;
    taskPerformers: User[];
    controlPointIds: IControlPoint[];
}

export interface FilteredTask extends Task{
    shouldBeVisible: boolean;
}
export interface IControlPoint{
    id: number;
    EndDate: Date;
    Name : string;
}

export enum TaskStatus{
    "Not started"= 1,
    "In progress"= 2,
    "Done"= 3
}

export interface SavingTask {
    parentTaskId:number;
    description: string;
    TaskStatusId: TaskStatus;
    title: string;
    mainPerformer: number;
    taskPerformers: User[];
    controlPointIds: IControlPoint[];
}