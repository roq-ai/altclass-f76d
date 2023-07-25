import { StudentInterface } from 'interfaces/student';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TutorInterface {
  id?: string;
  user_id?: string;
  profile_info?: string;
  created_at?: any;
  updated_at?: any;
  student?: StudentInterface[];
  user?: UserInterface;
  _count?: {
    student?: number;
  };
}

export interface TutorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  profile_info?: string;
}
