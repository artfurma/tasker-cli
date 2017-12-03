import { ProjectEdit } from './project-edit';
import { ProjectAdd } from './project-add';
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
    private addProjectUrl = '/api/Project';
    private editProjectUrl = '/api/Project';
    private deleteProjectUrl = '/api/Project/';

    constructor(private http: HttpClient) { }

    getProjectsFromUser(userId: number) {
        return this.http.get<ProjectModel[]>(this.getProjectsFromUserURL + userId );
    }

    getProjectDetails(projectId: number) {
        return this.http.get<ProjectModel>(this.getProjectURL + projectId);
    }

    addProject(projectToAdd: ProjectAdd) {
        return this.http.post<ProjectModel>(this.addProjectUrl, projectToAdd);
    }

    editProject(projectToEdit: ProjectEdit){
        return this.http.put<ProjectModel>(this.editProjectUrl, projectToEdit);
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

    deleteProject(projectId: number){
        return this.http.delete(this.deleteProjectUrl + projectId);
    }
}
