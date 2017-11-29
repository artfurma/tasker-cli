import { ProjectModel } from './../shared/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from './../shared/project.service';
import { ProjectAdd } from './../shared/project-add';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'tskr-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})

export class ProjectAddComponent {

  projectToAdd: ProjectAdd;
  project: ProjectModel;
  constructor(private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.projectToAdd = new ProjectAdd();
    }

    addProject() {
      this.projectToAdd.OwnerId = JSON.parse(localStorage.getItem('currentUser')).id;
      this.projectService.addProject(this.projectToAdd)
            .subscribe(res => { this.project = res;
                                this.dialogRef.close(this.project); });
    }

    no() {
      this.dialogRef.close();
    }
}
