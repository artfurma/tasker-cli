import { Component, OnInit, Input } from '@angular/core';
import { MilestoneModel } from '../shared/milestone-model';

@Component({
  selector: 'tskr-milestone-thumbnail',
  templateUrl: './milestone-thumbnail.component.html',
  styleUrls: ['./milestone-thumbnail.component.scss']
})
export class MilestoneThumbnailComponent implements OnInit {

  @Input() milestone: MilestoneModel;
  
  constructor() { }

  ngOnInit() {
  }

}
