import { IUserName } from 'src/app/core/models/user-name.model';

export interface IUserAuthState {
  user: IUserName;
  token: string;
}

export const initialUserAuthState = {
  token: '',
  user: {
    firstName: '',
    lastName: ''
  }
};
