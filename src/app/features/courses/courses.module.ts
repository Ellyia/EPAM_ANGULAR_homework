import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from '../courses/courses.component';
import { CourseCardComponent } from '../../features/courses/components/courseCard/courseCard.component';
import { SearchBarComponent } from '../../features/courses/components/searchBar/searchBar.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';

import { DateDependHighlightDirective } from '../../shared/directives/dateDependHighlight.directive';
import { FormatDurationPipe } from '../../shared/pipes/duration.pipe';
import { FilterItemsPipe } from '../../shared/pipes/filterItems.pipe';
import { OrderByPipe } from '../../shared/pipes/orderBy.pipe';

import { CourseFormComponent } from '../../features/courses/pages/courseForm/courseForm.component';
import { DurationInputComponent } from '../../shared/components/durationInput/durationInput.component';
import { DateInputComponent } from '../../shared/components/dateInput/dateInput.component';
import { AuthorsInputComponent } from '../../shared/components/authorsInput/authorsInput.component';
import { IsAuthenticatedDirective } from 'src/app/shared/directives/ifAuthenticated.directive';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/:id', component: CourseFormComponent }
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    CourseCardComponent,
    SearchBarComponent,
    DurationInputComponent,
    DateInputComponent,
    AuthorsInputComponent,
    DateDependHighlightDirective,
    FormatDurationPipe,
    FilterItemsPipe,
    OrderByPipe,
    IsAuthenticatedDirective,
    BreadcrumbsComponent,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [CoursesComponent, CourseFormComponent]
})
export class CoursesModule {}
