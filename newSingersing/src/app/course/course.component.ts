import { Component, OnInit } from '@angular/core';
import {LEVELS} from '../level/levels';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Courses} from './courses';
import {Level} from '../level/level';
import {CourseService} from './course.service';
import {CourseInfo} from './CourseInfo';
import {PhaseVO} from './phase-vo';
import {TermVO} from './term-vo';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseService]
})
export class CourseComponent implements OnInit {


  phases: PhaseVO[];
  constructor(private route: ActivatedRoute, private courseService: CourseService, public router: Router ) { }
  getCourses() {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.selectedLevel = LEVELS[id - 1];
    this.courseService.getAllCourses(id).subscribe(x => {console.log('x===', x);
      this.phases = x; });
    console.log('courses==', this.phases);
}


  createNewCourse(phaseInfo: PhaseVO, termInfo: TermVO) {
    const redirect = '/create-course' ;
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigate([redirect ], {queryParams: {'levelId': id, phaseId: phaseInfo.phaseId, termId: termInfo.termId}});
  }
  playCourse(courseId: number) {
    const id = +this.route.snapshot.paramMap.get('id');
    const redirect = '/play/' + courseId + '/' + id;
    this.router.navigate([redirect]);
  }

  ngOnInit() {
    console.log('uuu', this.route.snapshot.paramMap.keys);
    this.getCourses();
  }

}
