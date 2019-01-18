import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
// import {AuthGuard} from './auth.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {CanDeactivateGuard} from './can-deactivate.guard';



const routes: Routes = [
  {path: '', redirectTo: '/level', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'create-course',
    loadChildren: './create-course/create-course.module#CreateCourseModule',
    canLoad: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy:  PreloadAllModules })],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class AppRoutingModule { }
