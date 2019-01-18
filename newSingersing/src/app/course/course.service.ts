import { Injectable } from '@angular/core';
import {HttpService} from '../http.service';
import {Observable} from 'rxjs';
import {Courses} from '../course/courses';
import {CourseInfo} from './CourseInfo';
import {PhaseVO} from './phase-vo';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  level_id: number;
  constructor(private  http: HttpService) { }
  getCourses(): Observable<Courses[]> {
    const  getCourseUrl = '/course/getCourses';
    return this.http.get(getCourseUrl);
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }
  getAllCourses(levelId: number): Observable<PhaseVO[]> {
    const  getCourseUrl = '/course/getAllCourses';
    return this.http.post(getCourseUrl, levelId);
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }

}
