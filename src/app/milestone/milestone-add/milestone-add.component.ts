import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MilestoneModel } from '../shared/milestone-model';
import { MilestoneAdd } from '../shared/milestone-add';

@Component({
  selector: 'tskr-milestone-add',
  templateUrl: './milestone-add.component.html',
  styleUrls: ['./milestone-add.component.scss']
})
export class MilestoneAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MilestoneAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
