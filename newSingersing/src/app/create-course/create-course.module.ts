import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseRoutingModule } from './create-course-routing.module';
import {CreateCourseComponent} from './create-course.component';
import {FormsModule} from '@angular/forms';
import {ModuleComponent} from '../module/module.component';
import {RegularCourseComponent} from '../regular-course/regular-course.component';
import {DynamicCourseComponent} from '../dynamic-course/dynamic-course.component';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import {SelectSongsComponent} from '../module/select-songs/select-songs.component';

@NgModule({
  declarations: [CreateCourseComponent,
    ModuleComponent,
    RegularCourseComponent,
    SelectSongsComponent,
    DynamicCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ModalModule.forRoot(),
    CreateCourseRoutingModule
  ],
  entryComponents: [SelectSongsComponent],
})
export class CreateCourseModule { }
