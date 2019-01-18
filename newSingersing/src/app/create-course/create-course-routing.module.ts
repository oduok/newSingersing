import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {CreateCourseComponent} from './create-course.component';
import {DynamicCourseComponent} from '../dynamic-course/dynamic-course.component';
import {RegularCourseComponent} from '../regular-course/regular-course.component';
const routes: Routes = [
  { path: 'create-course',  component: CreateCourseComponent, canActivate: [AuthGuard],
    children: [
    {
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        { path: 'dynamic', component: DynamicCourseComponent , pathMatch: 'full' },
        { path: 'regular', component: RegularCourseComponent, pathMatch: 'full'  }
      ]
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCourseRoutingModule { }
