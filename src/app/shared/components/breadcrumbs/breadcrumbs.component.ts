import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBreadcrumb } from '../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: IBreadcrumb[] = [];
}
