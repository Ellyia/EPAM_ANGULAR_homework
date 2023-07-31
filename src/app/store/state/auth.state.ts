import { IUserName } from 'src/app/core/models/user-name.model';

export interface IUserAuthState {
  user: IUserName;
  auth: boolean;
}

export const initialUserAuthState = {
  auth: false,
  user: {
    firstName: '',
    lastName: ''
  }
};
