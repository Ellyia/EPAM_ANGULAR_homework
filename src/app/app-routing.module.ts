import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CoursesComponent } from './features/courses/courses.component';
// import { CourseFormComponent } from './features/courses/pages/courseForm/courseForm.component';
import { PageNotFoundComponent } from './core/components/pageNotFound/pageNotFound.component';

import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [authGuard]
  },
  {
    path: 'courses/new',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
