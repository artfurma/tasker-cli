import { Component, OnInit, Input } from '@angular/core';
import { MilestoneModel } from '../shared/milestone-model';
import * as moment from 'moment';

@Component({
  selector: 'tskr-milestone-thumbnail',
  templateUrl: './milestone-thumbnail.component.html',
  styleUrls: ['./milestone-thumbnail.component.scss']
})
export class MilestoneThumbnailComponent implements OnInit {

  @Input() milestone: MilestoneModel;

  dayOfWeek: string;
  day: string;
  monthAndYear: string;

  constructor() { }

  ngOnInit() {
    moment.locale('pl');
    const formattedDate = moment(this.milestone.endDate).format('LLLL');
    const splitted = formattedDate.split(' ');
    this.dayOfWeek = splitted[0].slice(0, -1);
    this.day = splitted[1];
    this.monthAndYear = `${splitted[2]} ${splitted[3]}`;
  }

}
