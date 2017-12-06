import { MilestoneModel } from './milestone-model';
import { MilestoneAdd } from './milestone-add';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MilestoneService {

    private addMilestoneURL = '/api/Milestones';
    private deleteMilestoneURL = '/api/Milestones/';
    private getAllMilestonesUrl = '/api/milestones/getall/';
    constructor(private http: HttpClient) { }

    public addMilestone(milestoneAdd: MilestoneAdd) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post<number>(this.addMilestoneURL, milestoneAdd, { headers: headers });
    }

    getAllMilestones() {
        return this.http.get<MilestoneModel[]>(this.getAllMilestonesUrl + localStorage.getItem('currentProject'));
    }

    public deleteMilestone(milestoneId: number) {
        return this.http.delete(this.deleteMilestoneURL + milestoneId);
    }

    public editMilestone(milestoneModel: MilestoneModel) {
        return this.http.put(this.addMilestoneURL, milestoneModel);
    }

}
