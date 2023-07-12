import { ICourse } from '../models/course.model';
import { Inject, Injectable } from '@angular/core';
import { ICourseForm } from '../models/course-form.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public apiUrl?: string;
  environment = environment;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = `${this.environment.apiUrl}`;
  }

  getList(
    start: number,
    count: number,
    textFragment: string = ''
  ): Observable<ICourse[]> {
    return this.http
      .get<ICourse[]>(
        `${this.apiUrl}/courses?start=${start}&count=${count}&textFragment=${textFragment}&sort=date`
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  createCourse(item: ICourseForm): Observable<ICourse> {
    return this.http
      .post<ICourse>(`${this.apiUrl}/courses`, item)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getItemById(id: number): Observable<ICourse> {
    return this.http
      .get<ICourse>(`${this.apiUrl}/courses/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  updateItem(item: ICourseForm): Observable<ICourse> {
    const id = item.id as number;
    return this.http
      .put<ICourse>(`${this.apiUrl}/courses/${id}`, item)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  removeItem(id: number): Observable<ICourse[]> {
    return this.http
      .delete<ICourse[]>(`${this.apiUrl}/courses/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
