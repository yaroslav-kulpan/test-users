import { UserProfile } from '@interfaces/users-profile.interface';

export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;

  profile?: UserProfile;
}
