import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { USER } from '../../data/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: IUser = USER;
}
