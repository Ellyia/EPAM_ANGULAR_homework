import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'header';

  @Input() user: IUser;
  @Input() src: string;
  @Input() srcLogout: string;
  @Input() srcUser: string;
}
