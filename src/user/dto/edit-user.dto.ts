export class EditUserDto {
  firstName?: string;
  lastName?: string;
  gender?: string;
  role?: 'admin' | 'user';
}
