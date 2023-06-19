import { Component } from '@angular/core';
import { IUser } from '../../models/user.model';
import { USER } from '../../../assets/static/mock-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: IUser = USER;
  title = 'Video course';
}
