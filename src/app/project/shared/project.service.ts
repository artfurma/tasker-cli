import { ProjectMember } from './project-member';
import { ProjectModel } from './project.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService {

    private getProjectsFromUserURL = '/api/Project/user/';
    private getProjectURL = '/api/Project/';
    private getMembersURL = '/api/Project/members?';
    private deleteMemberURL = 'api/Project/unassign/';
    private addMemberURL = 'api/Project/assign';

    constructor(private http: HttpClient) { }

    getProjectsFromUser(userId: number) {
        return this.http.get<ProjectModel[]>(this.getProjectsFromUserURL + userId );
    }

    getProjectDetails(projectId: number) {
        return this.http.get<ProjectModel>(this.getProjectURL + projectId);
    }

    getAllMembers(projectId: number) {
        return this.http.get<ProjectMember[]>(this.getMembersURL + 'projectId=' + projectId);
    }

    removeMember(memberId: number, projectId: number) {
        return this.http.delete(this.deleteMemberURL + memberId + '/' + projectId);
    }

    addMember(memberEmail: string, projectId: number) {
        return this.http.post<ProjectMember>(this.addMemberURL, {UserEmail : memberEmail, ProjectId: projectId });
    }
}
