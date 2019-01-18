import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CourseVO} from '../create-course/course-vo';
import {HttpService} from '../http.service';
import {PlayInfoVO} from './playInfoVO';
import {PlayListGetVO} from './play-list-get-vo';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private  http: HttpService) { }


  getPlayInfo(playListGetVO: PlayListGetVO): Observable<PlayInfoVO[]> {
    const  getPlayInfoUrl = '/course/getPlayInfoList';
    return this.http.post(getPlayInfoUrl, playListGetVO);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }
}
