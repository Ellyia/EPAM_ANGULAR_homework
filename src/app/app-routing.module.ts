import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseFormComponent } from './features/courses/pages/courseForm/courseForm.component';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './core/components/pageNotFound/pageNotFound.component';

import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Courses' }
  },
  {
    path: 'courses/new',
    component: CourseFormComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Course New' }
  },
  {
    path: 'courses/:id',
    component: CourseFormComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Course Edit' }
    // data: { breadcrumb: (data: any) => {
    //   `${data.course.title}`
    // } }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
