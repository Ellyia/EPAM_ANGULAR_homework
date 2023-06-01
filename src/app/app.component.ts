import { Component } from '@angular/core';

import { ICourse } from './models/course';
import { IUser } from './models/user';
import { courses } from './data/course';
import { users } from './data/user'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  users: IUser[] = users;
  src: string = 'https://pngimg.com/uploads/pokemon/pokemon_PNG129.png';
  srcLogout: string = 'https://img.icons8.com/?size=512&id=2445&format=png';
  srcUser: string = 'https://img.icons8.com/?size=512&id=83190&format=png';

  courses: ICourse[] = courses;
}
