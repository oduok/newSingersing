import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {HomeworkComponent} from './homework.component';
import { CanDeactivateGuard } from '../can-deactivate.guard';

const routes: Routes = [
  { path: 'homework/:course_id/:level_id',   component: HomeworkComponent,   canActivate: [AuthGuard] , canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworkRoutingModule { }
