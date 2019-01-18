import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CourseInfo} from '../course/CourseInfo';
import {HttpService} from '../http.service';
import {CourseVO} from './course-vo';
import {ModuleVO} from '../module/module-vo';
import {PlayListGetVO} from '../play/play-list-get-vo';
import {PlayInfoVO} from '../play/playInfoVO';
import {SongsHouseVO} from '../module/select-songs/songs-house-vo';
import {SongsHouseInfoVO} from '../module/select-songs/songs-house-info-vo';
import {SearchSongHouseVO} from '../module/select-songs/song-house-search/search-song-house-vo';
import {CourseSaveVO} from './courseSaveVO';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  courseId: number;
  moduleId: number;
  constructor(private  http: HttpService) {}
  getDynamicCourse( playListGetVO: PlayListGetVO): Observable<CourseVO[]> {
    const  getCourseUrl = '/course/getDynamicCourse';
    return this.http.post(getCourseUrl, playListGetVO);
      // .subscribe(x => {console.log('x===', x);
      // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }
  getRegularCourse( playListGetVO: PlayListGetVO): Observable<CourseVO[]> {
    const  getCourseUrl = '/course/getRegularCourse';
    return this.http.post(getCourseUrl, playListGetVO);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }

  getModules(playListGetVO: PlayListGetVO): Observable<ModuleVO[]> {
    const  getCourseUrl = '/course/getModules';
    return this.http.post(getCourseUrl, playListGetVO);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }
  getRegularListByModule(playListGetVO: PlayListGetVO): Observable<PlayInfoVO[]> {
    const  getPlayInfoUrl = '/course/getRegularListByModule';
    return this.http.post(getPlayInfoUrl, playListGetVO);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }

  getSelectableSongsHouse(moduledId: number): Observable<SongsHouseVO> {
    const  getSelectableSongsHouseUrl = '/course/getSelectableSongsHouse';
    return this.http.post(getSelectableSongsHouseUrl, moduledId);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }
  getOptionPlayInfoList(playListGetVO: PlayListGetVO): Observable<PlayInfoVO> {
    const  getOptionPlayInfoListUrl = '/course/getOptionPlayInfoList';
    return this.http.post(getOptionPlayInfoListUrl, playListGetVO);
    // .subscribe(x => {console.log('x===', x);
    // this.courses = x; });;
    //
    // this.httpService.post('/api-ebill360/ebill360/bill/billList').subscribe(res =>{
    //   console.log('res',res)
    // })
  }

  searchSongsHouseInfo(term: string): Observable<SongsHouseInfoVO[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const searchSongHouseVO: SearchSongHouseVO = {moduleId: this.moduleId, fileName: term};
    const  getSelectableSongsHouseUrl = '/course/getSelectableSongsHouseFile';
   return this.http.post(getSelectableSongsHouseUrl, searchSongHouseVO);
  }
  save(courseSaveVO: CourseSaveVO) {
    const  saveUrl = '/course/save';
    return this.http.post(saveUrl, courseSaveVO);
  }
}
