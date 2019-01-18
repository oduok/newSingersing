import { Injectable } from '@angular/core';
import {HttpService} from '../http.service';
import {PlayListGetVO} from '../play/play-list-get-vo';
import {Observable} from 'rxjs';
import {PlayInfoVO} from '../play/playInfoVO';
import {CourseFileVO} from '../play/courseFileVO';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  constructor(private  http: HttpService) { }
  getHomework(playListGetVO: PlayListGetVO): Observable<CourseFileVO[]> {
    const  getHomeworkUrl = '/course/getHomeworkPlayInfoList';
    return this.http.post(getHomeworkUrl, playListGetVO);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }
}
