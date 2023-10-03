import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from '../courses/courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';

import { DateDependHighlightDirective } from '../../shared/directives/date-depend-highlight.directive';
import { FormatDurationPipe } from '../../shared/pipes/duration.pipe';
import { FilterItemsPipe } from '../../shared/pipes/filterItems.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
import { DurationInputComponent } from '../../shared/components/duration-input/duration-input.component';
import { DateInputComponent } from '../../shared/components/date-input/date-input.component';
import { AuthorsInputComponent } from '../../shared/components/authors-input/authors-input.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: 'new',
    component: CourseFormComponent,
    canActivate: [authGuard]
  },
  {
    path: ':id',
    component: CourseFormComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    SearchBarComponent,
    DurationInputComponent,
    DateInputComponent,
    AuthorsInputComponent,
    DateDependHighlightDirective,
    FormatDurationPipe,
    FilterItemsPipe,
    OrderByPipe,
    BreadcrumbsComponent,
    CourseFormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [CoursesComponent, CourseFormComponent]
})
export class CoursesModule {}
