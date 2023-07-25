import { ParentInterface } from 'interfaces/parent';
import { TutorInterface } from 'interfaces/tutor';
import { GetQueryInterface } from 'interfaces';

export interface StudentInterface {
  id?: string;
  parent_id?: string;
  tutor_id?: string;
  created_at?: any;
  updated_at?: any;

  parent?: ParentInterface;
  tutor?: TutorInterface;
  _count?: {};
}

export interface StudentGetQueryInterface extends GetQueryInterface {
  id?: string;
  parent_id?: string;
  tutor_id?: string;
}
