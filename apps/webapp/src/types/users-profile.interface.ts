export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  OTHER = 'OTHER',
}

export interface UserProfile {
  id?: number;

  user_id?: number;
  age: number;
  weight: number;
  height: number;
  gender: GenderEnum;
}
