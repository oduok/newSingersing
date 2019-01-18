import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DialogService} from '../dialog.service';
import {PlayListGetVO} from '../play/play-list-get-vo';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CourseFileVO} from '../play/courseFileVO';
import {HomeworkService} from './homework.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  constructor(private  dialogService: DialogService, private route: ActivatedRoute, private  location: Location,
              private homeworkService: HomeworkService
  ) { }
  courseFileList: CourseFileVO[];
  cancel() {
    // this.gotoCrises();
  }
  goback() {
    this.location.back();
  }

  save() {
    // this.crisis.name = this.editName;
    // this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    // if (!this.crisis || this.crisis.name === this.editName) {
    //   return true;
    // }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
  getHomeworkFiles() {
    const courseid = +this.route.snapshot.paramMap.get('course_id');
    const levelid = +this.route.snapshot.paramMap.get('level_id');
    const playListGetVO: PlayListGetVO = {courseId: courseid, levelId: levelid, moduleId: 0, phaseId: 0, termId: 0};
    this.homeworkService.getHomework(playListGetVO).subscribe(x => {console.log('x===', x);
      this.courseFileList = x; });
  }

  ngOnInit() {
  }

}
