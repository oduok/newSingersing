import {PlayInfoVO} from '../play/playInfoVO';


export class CourseSaveVO {
  levelId: number;
  courseName: string;
  phaseId: number;
  termId: number;
  courseId: number;
  playInfoList: PlayInfoVO[];
}
