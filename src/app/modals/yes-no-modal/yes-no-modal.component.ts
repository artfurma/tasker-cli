import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'tskr-yes-no-modal',
    templateUrl: './yes-no-modal.component.html',
    styleUrls: ['./yes-no-modal.component.scss']
})
export class YesNoModalComponent {

    constructor(public dialogRef: MatDialogRef<YesNoModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    yes() {
        this.dialogRef.close(true);
    }

    no() {
        this.dialogRef.close();
    }
}
