import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthServise } from '../../core/services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [LoginComponent]
})
export class LoginModule {}
