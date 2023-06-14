import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDateDependHighlight]'
})
export class DateDependHighlightDirective implements OnInit {
  @Input() creationDate: string | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const courseDate: Date = new Date(this.creationDate as string);
    const currentDate: Date = new Date();

    courseDate.setHours(0);
    courseDate.setMinutes(0);
    courseDate.setSeconds(0);
    courseDate.setMilliseconds(0);

    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    const fourteenDaysAgo: number = new Date().setDate(
      currentDate.getDate() - 14
    );

    if (currentDate > courseDate && courseDate.getTime() <= fourteenDaysAgo) {
      this.elementRef.nativeElement.style.border = '2px solid darkseagreen';
    } else if (currentDate.getTime() < courseDate.getTime()) {
      this.elementRef.nativeElement.style.border = '2px solid deepskyblue';
    }
  }
}
