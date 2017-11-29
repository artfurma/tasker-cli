export class MilestoneModel {
    id: number;
    endDate: Date;
    name: string;
    constructor() {
        this.endDate = new Date();
        this.name = '';
    }
}
