import { User } from "../../users/user/user";

export interface Task {
    id: number;
    name: string;
    description: string;
    children?: Task[];
    status: TaskStatus;
    title: string;
    users: User[];
    controlPoints: IControlPoint[]
}
export interface IControlPoint{
    id: number;
    endDate: Date;
}

export enum TaskStatus{
    "Not started"= 1,
    "In progress"= 2,
    "Done"=3
}