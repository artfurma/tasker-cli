import { MilestoneAdd } from './shared/milestone-add';
import { MilestoneService } from './shared/milestone.service';
import { MilestoneModel } from './shared/milestone-model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MilestoneAddComponent } from './milestone-add/milestone-add.component';

@Component({
    selector: 'tskr-milestone',
    templateUrl: './milestone.component.html',
    styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

    milestones: MilestoneModel[] = [];
    milestoneToAdd: MilestoneAdd;
    milestoneToEdit: MilestoneModel;
    editMode = false;
    constructor(private milestoneService: MilestoneService, public dialog: MatDialog) { }

    ngOnInit() {
        this.milestoneService.getAllMilestones().subscribe(res => {
            res.sort((a, b) => {
                // console.log(this.getTime(a.endDate));
                return new Date(a.endDate).getDate() - new Date(b.endDate).getDate();
            });

            this.milestones = res;
        });
        this.milestoneToAdd = new MilestoneAdd();
        this.milestoneToEdit = new MilestoneModel();
    }

    deleteMilestone(milestone: MilestoneModel) {
        this.milestoneService.deleteMilestone(milestone.id).subscribe();
        const index = this.milestones.indexOf(milestone);
        this.milestones.splice(index, 1);
    }

    // addMilestone(milestoneAdd: MilestoneAdd) {
    //   this.milestoneService.addMilestone(milestoneAdd).subscribe(res => {
    //     const newMilestone = new MilestoneModel();
    //     newMilestone.id = res;
    //     newMilestone.endDate = milestoneAdd.EndDate;
    //     newMilestone.name = milestoneAdd.Name;
    //     this.milestones.push(newMilestone);
    //   });

    // }
    addMilestone() {
        const dialogRef = this.dialog.open(MilestoneAddComponent, {
            width: '480px',
            // data: { projectId: this.}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.milestones.push(result);
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

//     private getTime(date: Date) {
//         return date != null ? date.getTime() : 0;
//     }
// }
