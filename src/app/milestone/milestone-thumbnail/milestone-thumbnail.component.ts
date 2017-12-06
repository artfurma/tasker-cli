import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MilestoneModel } from '../shared/milestone-model';
import * as moment from 'moment';
import { MilestoneEditComponent } from '../milestone-edit/milestone-edit.component';
import { MilestoneService } from '../shared/milestone.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { YesNoModalComponent } from '../../modals/yes-no-modal/yes-no-modal.component';

@Component({
    selector: 'tskr-milestone-thumbnail',
    templateUrl: './milestone-thumbnail.component.html',
    styleUrls: ['./milestone-thumbnail.component.scss']
})
export class MilestoneThumbnailComponent implements OnInit, OnChanges {

    @Input() milestone: MilestoneModel;
    @Output() milestoneDeleted: EventEmitter<MilestoneModel> = new EventEmitter();

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
        const dialogRef = this.dialog.open(YesNoModalComponent, {
            width: '250px',
            data: { message: 'Czy na pewno chcesz usunąć ten punkt kontrolny?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.milestoneService.deleteMilestone(this.milestone.id).subscribe(() => {
                    this.snackBar.open('Pomyślnie usunięto punkt kontrolny', '', { duration: 2000 });
                    this.milestoneDeleted.emit();
                });
            }
        });
    }

}
