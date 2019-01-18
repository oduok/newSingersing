import { Component, OnInit } from '@angular/core';
import {PlayInfoVO} from './playInfoVO';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayService} from './play.service';
import {PlayListGetVO} from './play-list-get-vo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor( public router: Router, private route: ActivatedRoute, private playService: PlayService, private  location: Location) { }
  palyInfoList: PlayInfoVO[];
  ngOnInit() {
    this.getPlayInfos();
  }

  goback() {
    this.location.back();
  }

  goHomework() {
    const courseid = +this.route.snapshot.paramMap.get('course_id');
    const levelid = +this.route.snapshot.paramMap.get('level_id');
    const redirect = '/homework/' + courseid + '/' + levelid;
    this.router.navigate([redirect]);
  }
  getPlayInfos() {
    const courseid = +this.route.snapshot.paramMap.get('course_id');
    const levelid = +this.route.snapshot.paramMap.get('level_id');
    const playListGetVO: PlayListGetVO = {courseId: courseid, levelId: levelid, moduleId: 0, phaseId: 0, termId: 0};
    this.playService.getPlayInfo(playListGetVO).subscribe(x => {console.log('x===', x);
      this.palyInfoList = x; });
  }
}
