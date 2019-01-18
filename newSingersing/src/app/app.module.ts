import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LevelModule } from './level/level.module';
import { FormsModule } from '@angular/forms';
import { CreateCourseModule } from './create-course/create-course.module';
import { PlayModule } from './play/play.module';
import { HomeworkModule } from './homework/homework.module';
import { CourseModule } from './course/course.module';
import { httpInterceptorProviders } from './http-interceptors/index';


@NgModule({
  declarations: [
    AppComponent,  
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    LevelModule,
    FormsModule,
    CreateCourseModule,
    PlayModule,
    HomeworkModule,
    CourseModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
