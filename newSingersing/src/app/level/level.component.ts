import { Component, OnInit } from '@angular/core';
import {LEVELS} from './levels';
import {Level} from './level';
import {Courses} from '../course/courses';
import {CourseService} from '../course/course.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levels = LEVELS;
  selectedLevel: Level;
  courses: Courses[];
  selectCourse: Courses;
  ii:any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
   this.getCourses();
  }
  onSelect(level: Level,i): void {
    this.selectedLevel = level;
    if (this.courses !== undefined) {
      this.selectCourse = this.courses[(level.id) - 1];
    }
    this.ii =i;
  }
  getCourses() {
   this.courseService.getCourses().subscribe(x => {console.log('x===', x);
   this.courses = x; });
   console.log('courses==', this.courses);
  }

}
