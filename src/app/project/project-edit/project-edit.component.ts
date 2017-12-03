import { ProjectModel } from './../shared/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from './../shared/project.service';
import { ProjectEdit } from './../shared/project-edit';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'tskr-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {


  projectToEdit: ProjectEdit;
  project: ProjectModel;
  constructor(private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.projectToEdit = new ProjectEdit();
      this.projectToEdit.Id = data.id;
      this.projectToEdit.Name = data.name;
      this.projectToEdit.Description = data.description;
    }

    editProject() {
      this.projectService.editProject(this.projectToEdit)
            .subscribe(res => { this.project = res;
                                this.dialogRef.close(this.project); });
    }

    no() {
      this.dialogRef.close();
    }

}
