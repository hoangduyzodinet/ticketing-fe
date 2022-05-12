export interface IUserInterface {
  name: string;
  email: string;
}

export interface IUserProfile {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  gender?: string;
  birthday?: moment.Moment;
  numberPhone?: string;
  avatar?: string;
  isDeleted?: boolean;
  isLoggedIn?: boolean;
  isBankAccount?: boolean;
}
