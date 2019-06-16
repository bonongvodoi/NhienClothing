export interface IUser {
  _id: any;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordResetToken: any;
  facebookUserId: string;
  magicToken: string;
  auditlog: any;

  generateMagicToken(): void;
  comparePassword(): any;
  getCurrentUser(): any;
  getCurrentUserSoft(): any;
}