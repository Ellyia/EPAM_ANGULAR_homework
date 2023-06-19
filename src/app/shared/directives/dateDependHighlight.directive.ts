import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { resetTime } from '../helpers/resetTime.helper';

@Directive({
  selector: '[appDateDependHighlight]'
})
export class DateDependHighlightDirective implements OnInit {
  @Input() creationDate: string | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const courseDate: Date = new Date(this.creationDate as string);
    const currentDate: Date = new Date();

    resetTime(courseDate);
    resetTime(currentDate);

    const fourteenDaysAgo: number = new Date().setDate(
      currentDate.getDate() - 14
    );

    if (currentDate >= courseDate && courseDate.getTime() >= fourteenDaysAgo) {
      this.elementRef.nativeElement.style.border = '2px solid darkseagreen';
    } else if (currentDate.getTime() < courseDate.getTime()) {
      this.elementRef.nativeElement.style.border = '2px solid deepskyblue';
    }
  }
}
