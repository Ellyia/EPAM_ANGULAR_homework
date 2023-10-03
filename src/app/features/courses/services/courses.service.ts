import { ICourse } from '../models/course.model';
import { Injectable } from '@angular/core';
import { ICourseForm } from '../models/course-form.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';
import { environment } from 'src/environments/environment.prod';
import { IAuthor } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public apiUrl?: string;
  environment = environment;
  url?: URL;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = this.environment.apiUrl;
    this.url = new URL(`${this.apiUrl}/courses`);
  }

  getList(
    start: number,
    count: number,
    textFragment: string = ''
  ): Observable<ICourse[]> {
    return this.http
      .get<ICourse[]>(
        `${this.url}?start=${start}&count=${count}&textFragment=${textFragment}&sort=date`
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  createCourse(item: ICourseForm): Observable<ICourse> {
    return this.http
      .post<ICourse>(`${this.url}`, item)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getItemById(id: number): Observable<ICourse> {
    return this.http
      .get<ICourse>(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  updateItem(item: ICourseForm): Observable<ICourse> {
    const id = item.id as number;
    return this.http
      .put<ICourse>(`${this.url}/${id}`, item)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  removeItem(id: number): Observable<ICourse[]> {
    return this.http
      .delete<ICourse[]>(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getAuthors(): Observable<IAuthor[]> {
    return this.http
      .get<IAuthor[]>(`${this.apiUrl}/authors`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
