import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LevelComponent} from './level.component';
import {AuthGuard} from '../auth.guard';


const routes: Routes = [
  { path: 'level',   component: LevelComponent,   canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelRoutingModule { }
