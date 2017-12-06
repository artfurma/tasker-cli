import { User } from "../../users/user/user";

export interface Task {
    id: number;
    parentTaskId: number;
    name: string;
    description: string;
    children?: Task[];
    statusId: TaskStatus;
    title: string;
    mainPerformer: number;
    taskPerformers: User[];
    controlPointIds: IControlPoint[];
    showChildren: boolean;
}

export declare var TaskObj: Task;

export interface FilteredTask extends Task {
    shouldBeVisible: boolean;
}

export interface IControlPoint {
    id: number;
    EndDate: Date;
    Name: string;
}

export enum TaskStatus {
    "Not started" = 1,
    "In progress" = 2,
    "Done" = 3
}

export interface SavingTask {
    Title: string;
    Description: string;
    ControlPointIds: IControlPoint[];
    MainPerformer: number;
    TaskStatusId: number;
    TaskPerformers: User[];
    ParentTaskId: number;
    ProjectId: number;
}

export interface EditingTask {
    Id: number;
    Title: string;
    Description: string;
    ControlPointIds: IControlPoint[];
    MainPerformer: number;
    TaskStatusId: number;
    TaskPerformers: User[];
    ParentTaskId: number;
}