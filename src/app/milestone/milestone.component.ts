import { MilestoneAdd } from './shared/milestone-add';
import { MilestoneService } from './shared/milestone.service';
import { MilestoneModel } from './shared/milestone-model';
import { Component, OnInit } from '@angular/core';

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
  constructor(private milestoneService: MilestoneService) { }

  ngOnInit() {
    this.milestoneService.getAllMilestones().subscribe(res => this.milestones = res);
    this.milestoneToAdd = new MilestoneAdd();
    this.milestoneToEdit = new MilestoneModel();
  }

  deleteMilestone(milestone: MilestoneModel) {
    this.milestoneService.deleteMilestone(milestone.id).subscribe();
    const index = this.milestones.indexOf(milestone);
    this.milestones.splice(index, 1);
  }

  addMilestone(milestoneAdd: MilestoneAdd) {
    this.milestoneService.addMilestone(milestoneAdd).subscribe(res => {
      const newMilestone = new MilestoneModel();
      newMilestone.id = res;
      newMilestone.endDate = milestoneAdd.EndDate;
      newMilestone.name = milestoneAdd.Name;
      this.milestones.push(newMilestone);
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
