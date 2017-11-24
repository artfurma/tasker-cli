import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProjectMember } from './shared/project-member';
import { User } from './../users/user/user';
import { ProjectModel } from './shared/project.model';
import { ProjectService } from './shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'tskr-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  project: ProjectModel = new ProjectModel();
  members: ProjectMember[] = [];
  newUserEmail = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectService.getProjectDetails(+params['id']).subscribe(res => this.project = res);
      this.projectService.getAllMembers(+params['id']).subscribe(res => this.members = res);
    });
  }



  removeMember(member: ProjectMember) {
    this.projectService.removeMember(member.id, this.project.id).subscribe();
    const index = this.members.indexOf(member, 0);
    this.members.splice(index, 1);
  }

  addMember() {
    this.projectService.addMember(this.newUserEmail, this.project.id).subscribe(res => {
      let newMembers = new ProjectMember();
      newMembers = res;
      this.members.push(newMembers);
      this.newUserEmail = '';
    });
  }

}

