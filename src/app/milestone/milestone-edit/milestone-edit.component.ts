import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'tskr-milestone-edit',
    templateUrl: './milestone-edit.component.html',
    styleUrls: ['./milestone-edit.component.scss']
})
export class MilestoneEditComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<MilestoneEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

}
