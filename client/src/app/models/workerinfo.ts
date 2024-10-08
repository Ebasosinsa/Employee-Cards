import { workercategory } from './workercategory';
import { workerdepartment } from './workerdepartment';

export interface workerinfo {
  id_worker: number;
  fio_worker: string;
  birthday_worker: string;
  gender_worker: boolean;
  departments_worker: number;
  positions_worker: number;
  competency_worker: string;
  categories_worker: number;
  date_hiring_worker: any;
  note_worker?: string;
  add_date_worker: string;
  photo_worker: File | null;
  positions_worker_card: any;

  workercategory?: workercategory;
  workerdepartment?: workerdepartment;
}
