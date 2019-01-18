import {Component, Input, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {PlayListGetVO} from '../../play/play-list-get-vo';
import {PlayInfoVO} from '../../play/playInfoVO';
import {CreateCourseService} from '../../create-course/create-course.service';
import {SongsHouseVO} from './songs-house-vo';
import {CourseFileVO} from '../../play/courseFileVO';
import {Observable, Subject} from 'rxjs';
import {SongsHouseInfoVO} from './songs-house-info-vo';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-select-songs',
  templateUrl: './select-songs.component.html',
  styleUrls: ['./select-songs.component.css']
})
export class SelectSongsComponent implements OnInit {
  regularList: PlayInfoVO[];
  selectableSongsHouse: SongsHouseVO;
  public  optionPlayInfo: PlayInfoVO;
  constructor(public bsModalRef: BsModalRef, private  createCourseService: CreateCourseService) {
    console.log('===', this.bsModalRef.content);
  }
  public  levelId: number;
  public termId: number;
  public phaseId: number;
  public moduleId: number;
  public  couseId: number;
  public moduleName: string;
  isCancel = true;
  songHouses$: Observable<SongsHouseInfoVO[]>;
  private searchTerms = new Subject<string>();
  ngOnInit() {
    this.getRegularListByModule();
    this.getSelectableSongsHouse();
    this.getOptionPlayInfo();
    this.createCourseService.moduleId = this.moduleId;

    this.songHouses$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.createCourseService.searchSongsHouseInfo(term)),
    );
  }
  btnCloseClick() {
    this.bsModalRef.hide();
  }

  btnConfirmClick() {
    this.isCancel = false;
    this.bsModalRef.hide();
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  getRegularListByModule() {

    const playListGetVO: PlayListGetVO = {courseId: 0, levelId: 0, moduleId: this.moduleId, phaseId: 0, termId: 0};
    this.createCourseService.getRegularListByModule(playListGetVO).subscribe(x => {console.log('x===', x);
      this.regularList = x; });
  }
  getSelectableSongsHouse() {
    this.createCourseService.getSelectableSongsHouse(this.moduleId).subscribe(x => {console.log('x===', x);
      this.selectableSongsHouse = x; });
  }
  getOptionPlayInfo() {
    // this.optionPlayInfo.moduleId = this.moduleId;
    // this.optionPlayInfo.moduleName = this.moduleName;
    if (this.couseId !== undefined && this.couseId > 0) {
      const playListGetVO: PlayListGetVO = {courseId: this.couseId, levelId: 0, moduleId: this.moduleId, phaseId: 0, termId: 0};
      this.createCourseService.getOptionPlayInfoList(playListGetVO).subscribe(x => {console.log('x===', x);
        this.optionPlayInfo = x; });
    }
  }

  delete(courseFile: CourseFileVO) {
    this.optionPlayInfo.courseFileVOList = this.optionPlayInfo.courseFileVOList.filter(h => h !== courseFile);
  }



}
