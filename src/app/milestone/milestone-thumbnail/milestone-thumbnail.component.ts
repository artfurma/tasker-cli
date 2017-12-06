import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MilestoneModel } from '../shared/milestone-model';
import * as moment from 'moment';
import { MilestoneEditComponent } from '../milestone-edit/milestone-edit.component';
import { MilestoneService } from '../shared/milestone.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
    selector: 'tskr-milestone-thumbnail',
    templateUrl: './milestone-thumbnail.component.html',
    styleUrls: ['./milestone-thumbnail.component.scss']
})
export class MilestoneThumbnailComponent implements OnInit, OnChanges {

    @Input() milestone: MilestoneModel;

    dayOfWeek: string;
    day: string;
    monthAndYear: string;

    constructor(private milestoneService: MilestoneService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

    ngOnInit() {
        moment.locale('pl');
        const formattedDate = moment(this.milestone.endDate).format('LLLL');
        const splitted = formattedDate.split(' ');
        this.dayOfWeek = splitted[0].slice(0, -1);
        this.day = splitted[1];
        this.monthAndYear = `${splitted[2]} ${splitted[3]}`;
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    editMilestone() {
        const dialogRef = this.dialog.open(MilestoneEditComponent, {
            width: '450px',
            data: { milestone: this.milestone }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.milestoneService.editMilestone(result).subscribe(() => {
                    this.milestone = result;
                });
                this.snackBar.open('Zakończono edycje punktu kontrolnego', '', { duration: 2000 });
            }
        });
    }

    deleteMilestone() {
        
    }

}
