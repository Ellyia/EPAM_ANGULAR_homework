export interface IUser {
  id: number | null;
  fakeToken: string;
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}
