import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../course/course.service';
import {CreateCourseService} from '../create-course/create-course.service';
import {ModuleVO} from './module-vo';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {SelectSongsComponent} from './select-songs/select-songs.component';
import {PlayInfoVO} from '../play/playInfoVO';
import {CourseFileVO} from '../play/courseFileVO';
import {CourseSaveVO} from '../create-course/courseSaveVO';
import {Subscription} from 'rxjs';
import {PlayListGetVO} from '../play/play-list-get-vo';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit,  OnDestroy  {


  @Input() phaseInfo: CourseSaveVO;
    moduleVO: ModuleVO[];
  bsModalRef: BsModalRef;
  dynamicList: PlayInfoVO[] = [];
  subscription: Subscription;
  constructor( private  createCourseService: CreateCourseService,
               private modalService: BsModalService) { }

  ngOnInit() {
    this.getModuleVO();
  }

  getModuleVO() {
    const playListGetVO: PlayListGetVO = {levelId: this.phaseInfo.levelId,
      termId: this.phaseInfo.termId, phaseId: this.phaseInfo.phaseId, moduleId: 0, courseId: 0};
    this.createCourseService.getModules(playListGetVO).subscribe(x => {console.log('x===', x);
      this.moduleVO = x;
      for (const m of this.moduleVO) {
        if (m.moduleType === 1) {
           const optionPlayInfo: PlayInfoVO = {moduleId: m.id, moduleName: m.moduleName, courseFileVOList: [] };
          this.dynamicList.push(optionPlayInfo);
        }
      }
    });
    console.log('courses==', this.moduleVO);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    try {
      this.subscription.unsubscribe();
    } catch (e) {
    }
  }

  openModalWithComponent(moduleInfoId: number, moduleName: string) {

     let courseFileVOList: CourseFileVO[];
    for (const d of this.dynamicList)  {
      if (d.moduleId === moduleInfoId)  {
        courseFileVOList =   d.courseFileVOList;
      }
    }
    const initialState = {
      levelId: this.phaseInfo.levelId,
      moduleId: moduleInfoId,
      optionPlayInfo: {moduleId: moduleInfoId, moduleName: moduleName, courseFileVOList: courseFileVOList}
    };
    this.bsModalRef = this.modalService.show(SelectSongsComponent, { initialState });
    this.modalService.onHidden.subscribe((r: string) => {
      if (this.bsModalRef.content.isCancel) {
        console.log('取消了' + this.bsModalRef.content.optionPlayInfo);
      } else {
        console.log('确定了' + this.bsModalRef.content.optionPlayInfo);
        for (const d of this.dynamicList)  {
            if (d.moduleId === moduleInfoId)  {
              d.courseFileVOList = this.bsModalRef.content.optionPlayInfo.courseFileVOList;
            }
        }
      }
    } );


}}
