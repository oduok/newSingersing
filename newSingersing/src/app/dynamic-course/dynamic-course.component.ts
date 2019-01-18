import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {CreateCourseService} from '../create-course/create-course.service';
import { switchMap } from 'rxjs/operators';
import {CourseVO} from '../create-course/course-vo';
import {Subscription} from 'rxjs';
import {PlayListGetVO} from '../play/play-list-get-vo';

@Component({
  selector: 'app-dynamic-course',
  templateUrl: './dynamic-course.component.html',
  styleUrls: ['./dynamic-course.component.css']
})
export class DynamicCourseComponent implements OnInit ,  OnDestroy {

  level_id: number;
  phaseId: number;
  termId: number;
  subscription: Subscription;
  courseVO: CourseVO[];
  constructor(  private route: ActivatedRoute,
                private router: Router, private  createCourseService: CreateCourseService) { }

  ngOnInit() {
    this.getCoursesVO();
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    try {
      this.subscription.unsubscribe();
    } catch (e) {
    }
  }

  getCoursesVO() {

    this.route.queryParams.subscribe((params: Params) => {console.log('psssspppp参数==', params ); this.level_id  = params['levelId'];
      this.phaseId = params['phaseId']; this.termId = params['termId'];
      const playListGetVO: PlayListGetVO = {levelId: this.level_id, termId: this.termId, phaseId: this.phaseId, moduleId: 0, courseId: 0};
      this.createCourseService.getDynamicCourse(playListGetVO).subscribe(x => {console.log('x===', x);
        this.courseVO = x; });
      console.log('courses==', this.courseVO);
    });
  }

}
