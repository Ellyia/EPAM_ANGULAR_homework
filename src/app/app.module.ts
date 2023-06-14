import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BreadcrumbsComponent } from './core/components/breadcrumbs/breadcrumbs.component';
import { BrowserModule } from '@angular/platform-browser';
import { CourseCardComponent } from './features/courses/components/courseCard/courseCard.component';
import { CoursesComponent } from './features/courses/courses.component';
import { FooterComponent } from './core/components/footer/footer.component';

import { HeaderComponent } from './core/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from './features/courses/components/searchBar/searchBar.component';
import { FormsModule } from '@angular/forms';
import { DateDependHighlightDirective } from './shared/directives/dateDependHighlight.directive';
import { FormatDurationPipe } from './shared/pipes/duration.pipe';
import { FilterItemsPipe } from './shared/pipes/filterItems.pipe';
import { OrderByPipe } from './shared/pipes/orderBy.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseCardComponent,
    BreadcrumbsComponent,
    CoursesComponent,
    SearchBarComponent,
    FooterComponent,
    DateDependHighlightDirective,
    FormatDurationPipe,
    FilterItemsPipe,
    OrderByPipe
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
