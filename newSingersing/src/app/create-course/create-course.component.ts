import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {DialogService} from '../dialog.service';
import {CourseSaveVO} from './courseSaveVO';
import { Location } from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { TabsetConfig } from 'ngx-bootstrap';
import {CourseService} from '../course/course.service';
import {ModuleComponent} from '../module/module.component';
import {CreateCourseService} from './create-course.service';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  providers: [TabsetConfig, CreateCourseService]
})
export class CreateCourseComponent implements OnInit, AfterViewInit {

  @ViewChild(ModuleComponent)
  private moduleComponent: ModuleComponent;
  courseName = '';
  courseSaveVO: CourseSaveVO;
  level_id: number;
  termId: number;
  phaseId: number;
  constructor(private dialogService: DialogService,  public router: Router, private routeInfo: ActivatedRoute,
              private  createCourseService: CreateCourseService ) { }
  cancel() {
    // this.gotoCrises();
  }
  goBack(): void {
    const redirect = '/course' ;
    this.router.navigate([redirect, this.level_id ]);
  }

  save() {
    this.courseSaveVO = { playInfoList: this.moduleComponent.dynamicList, levelId: this.level_id,
      phaseId: this.phaseId, termId: this.termId, courseId: 0, courseName: this.courseName} ;
    this.createCourseService.save(this.courseSaveVO);
  }

  ngOnInit() {
   this.routeInfo.queryParams.subscribe((params: Params) => {console.log('参数==', params ); this.level_id  = params['levelId'];
   this.phaseId = params['phaseId']; this.termId = params['termId']; console.log('phavvvseID===', this.phaseId ); });
   console.log('phaseID===', this.phaseId);
  }


  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
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

}
