import { MilestoneAdd } from './shared/milestone-add';
import { MilestoneService } from './shared/milestone.service';
import { MilestoneModel } from './shared/milestone-model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MilestoneAddComponent } from './milestone-add/milestone-add.component';

@Component({
    selector: 'tskr-milestone',
    templateUrl: './milestone.component.html',
    styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

    milestones: MilestoneModel[] = [];
    milestoneToEdit: MilestoneModel;
    editMode = false;
    constructor(private milestoneService: MilestoneService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.milestoneService.getAllMilestones().subscribe(res => {
            res.sort((a, b) => {
                return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
            });

            this.milestones = res;
        });
        this.milestoneToEdit = new MilestoneModel();
    }

    deleteMilestone(milestone: MilestoneModel) {
        this.milestoneService.deleteMilestone(milestone.id).subscribe();
        const index = this.milestones.indexOf(milestone);
        this.milestones.splice(index, 1);
    }

    addMilestone() {
        const dialogRef = this.dialog.open(MilestoneAddComponent, {
            width: '450px',
            data: { milestone: new MilestoneModel() }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.milestoneService.addMilestone(result).subscribe(newId => {
                    result.id = newId;
                });
                this.milestones.push(result);
                this.milestones.sort((a, b) => {
                    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
                });
                this.snackBar.open('Nowy punkt kontrolny został dodany', '', { duration: 2000 });
            }
        });
    }

    turnEditMode(milestone: MilestoneModel) {
        this.milestoneToEdit.id = milestone.id;
        this.editMode = true;
    }

    editMilestone() {
        const toChange = this.milestones.filter(x => x.id === this.milestoneToEdit.id)[0];
        toChange.endDate = this.milestoneToEdit.endDate;
        toChange.name = this.milestoneToEdit.name;
        this.milestoneService.editMilestone(this.milestoneToEdit).subscribe();
        this.editMode = false;
    }
}
